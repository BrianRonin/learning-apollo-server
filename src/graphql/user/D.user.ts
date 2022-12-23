import { GraphQLError } from 'graphql'
import { myRestDatasource } from '../datasource'

export class datasource_user extends myRestDatasource {
  override baseURL =
    process.env.URI_LOCAL + '/users/'

  async getUsers(params = {}) {
    return await this.get('', { params })
  }

  getUser = this.makeDataLoader(
    this.getUsers.bind(this),
    'id',
    (id: string, response: any[]) =>
      response.find((data) => data.id === id),
  )

  async createUser(user) {
    const indexRef = await this.lastRef('', true)
    return await this.post('', {
      body: {
        ...user,
        indexRef: indexRef,
        createdAt: new Date().toISOString(),
      },
    })
  }

  async updateUser(id, user) {
    if (!id)
      throw new GraphQLError('id is missing')
    return await this.patch(id, {
      body: { ...user },
    })
  }

  async deleteUser(id) {
    if (!id)
      throw new GraphQLError('id is missing')
    await this.delete(id)
    return true
  }
}
