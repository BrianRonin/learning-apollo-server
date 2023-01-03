import { RESTDataSource } from '@apollo/datasource-rest'
import DataLoader from 'dataloader'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import { Payload } from '../../types/jsonWebToken'

type Credentials = {
  user: Payload
  password: string
}

export class MyRestDatasource extends RESTDataSource {
  makeDataLoader(
    get: (path?: string) => Promise<any>,
    param: string,
    mapCallback: (
      id: string,
      response: any[],
    ) => any,
  ): DataLoader<any, any, any> {
    return new DataLoader(
      async (ids: string[]) => {
        const urlQuery = ids.join(`&${param}=`)
        const response = await get(
          `?${param}=` + urlQuery,
        )
        return ids.map((id) =>
          mapCallback(id, response),
        )
      },
    )
  }

  async exist(
    endPoint: string,
    error?: {
      errorIfExist?: string
      errorElseExist?: string
    },
  ) {
    const { errorElseExist, errorIfExist } = error
    const exist = await this.get(endPoint, {
      cacheOptions: { ttl: 0 },
    })
    if (
      exist.length ||
      (typeof exist === 'object' && exist.id)
    ) {
      if (errorIfExist) {
        throw new GraphQLError(errorIfExist, {
          extensions: { code: 400 },
        })
      } else {
        return exist
      }
    } else {
      if (errorElseExist) {
        throw new GraphQLError(errorElseExist, {
          extensions: { code: 400 },
        })
      } else {
        return false
      }
    }
  }

  async lastRef(
    endPoint: string,
    moreOne?: boolean,
  ) {
    return await this.get(endPoint, {
      params: {
        _limit: '1',
        _sort: 'indexRef',
        _order: 'desc',
      },
    }).then((r) =>
      moreOne
        ? Number(r[0].indexRef) + 1
        : Number(r[0].indexRef),
    )
  }

  matchRegexPassword(
    input: string,
    error?: string,
  ) {
    const match = input.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/,
    )

    if (match) {
      return true
    } else {
      throw new GraphQLError(
        error
          ? error
          : 'password must contain a lowercase, uppercase letter and a number and must be between 6 to 30 characters long',
      )
    }
  }

  async validatePassword(
    credentials: Credentials,
  ) {
    const { userId, error } = credentials.user
    const actualUser = await this.exist(
      '/users/' + encodeURI(userId),
      {
        errorElseExist: error
          ? error
          : 'internal error',
      },
    )
    if (
      credentials.password &&
      actualUser.password &&
      (await bcrypt.compare(
        credentials.password,
        actualUser.password,
      ))
    ) {
      return true
    } else {
      throw new GraphQLError(
        'invalid credentials',
      )
    }
  }
}
