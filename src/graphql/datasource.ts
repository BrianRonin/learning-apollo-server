import { RESTDataSource } from '@apollo/datasource-rest'
import DataLoader from 'dataloader'
import { GraphQLError } from 'graphql'

export class myRestDatasource extends RESTDataSource {
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

  async userExist(id: string, error: string) {
    try {
      await this.get('/users/' + id, {
        cacheOptions: { ttl: 0 },
      })
    } catch (e) {
      throw new GraphQLError(error, {
        extensions: { code: 400 },
      })
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
}
