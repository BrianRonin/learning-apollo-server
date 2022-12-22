import { RESTDataSource } from '@apollo/datasource-rest'

export class datasource_post extends RESTDataSource {
  override baseURL =
    process.env.URI_LOCAL + '/posts/'

  async getPosts(params = {}) {
    return this.get('', { params })
  }

  async getPost(id: string) {
    return this.get(id)
  }
}
