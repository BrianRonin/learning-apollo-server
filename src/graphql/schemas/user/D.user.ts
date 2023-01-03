import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import { MyRestDatasource } from '../../datasources/RESTDatasource'

type InputCreateUser = {
  firstName?: string
  email?: string
  lastName?: string
  userName?: string
  password?: string
}

export class datasource_user extends MyRestDatasource {
  override baseURL = process.env.URI_LOCAL

  async getUsers(params = {}) {
    return await this.get('/users/', { params })
  }

  getUser = this.makeDataLoader(
    this.getUsers.bind(this),
    'id',
    (id: string, response: any[]) => {
      const find = response.find(
        (data) => data.id === id,
      )
      return find
        ? { ...find, password: '😎 trolei' }
        : undefined
    },
  )

  async createUser(user: InputCreateUser) {
    this.matchRegexPassword(user.password)
    await this.exist(
      '/users?userName=' +
        encodeURI(user.userName),
      { errorIfExist: 'username already exists' },
    )
    await this.exist(
      '/users?email=' + encodeURI(user.email),
      { errorIfExist: 'email already exists' },
    )
    const indexRef = await this.lastRef(
      '/users/',
      true,
    )
    const passwordHash = await bcrypt.hash(
      user.password,
      10,
    )
    await this.post('/users/', {
      body: {
        ...user,
        indexRef,
        password: passwordHash,
        createdAt: new Date().toISOString(),
      },
    })
    return true
  }

  async updateUser(
    userInput: InputCreateUser,
    userId: string,
  ) {
    return await this.patch(
      '/users/' + encodeURI(userId),
      {
        body: { ...userInput },
      },
    )
  }

  async deleteUser(id) {
    if (!id)
      throw new GraphQLError('id is missing')
    await this.delete('/users/' + id)
    return true
  }

  async queryMe(id: string) {
    if (!id)
      throw new GraphQLError('id is missing')
    const user = await this.get('/users/' + id)
    return {
      ...user,
      password: '😎 trolei',
    }
  }
}
