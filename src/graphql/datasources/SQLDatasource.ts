import DataLoader from 'dataloader'
import { SQLDataSource } from 'datasource-sql'
import knexfile from '../../db/knexfile'

export class MySQLDatasource extends SQLDataSource {
  constructor() {
    super(knexfile[process.env.NODE_ENV])
  }

  baseURL = process.env.URI_LOCAL

  makeDataLoader(
    callback: (ids: string[]) => any,
  ): DataLoader<any, any, any> {
    return new DataLoader(callback)
  }
}
