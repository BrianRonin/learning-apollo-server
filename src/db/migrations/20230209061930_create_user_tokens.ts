/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    'user_token',
    (table) => {
      table.increments('id').primary()
      table.text('token').notNullable()
      table.string('user_id', 255).notNullable()
    },
  )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_token')
}
