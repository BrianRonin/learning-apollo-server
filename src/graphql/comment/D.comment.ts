import { myRestDatasource } from '../datasource'

export class datasource_comment extends myRestDatasource {
  override baseURL =
    process.env.URI_LOCAL + '/comments/'

  async getComments(params = {}) {
    return this.get('', { params })
  }

  getComment = this.makeDataLoader(
    this.getComments.bind(this),
    'id',
    (id: string, response: any[]) =>
      response.find((data) => data.id === id),
  )
}
