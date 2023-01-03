import knexfile from '../../db/knexfile'
import _knex, { Knex } from 'knex'
const knex = _knex(
  knexfile[process.env.NODE_ENV],
) as Knex

export default knex
