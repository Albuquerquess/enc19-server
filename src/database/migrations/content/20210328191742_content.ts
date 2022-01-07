import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('content', (table: Knex.TableBuilder) => {
    table.increments('id').primary()
    table.string('originalname').notNullable()
    table.string('size').notNullable()
    table.string('nameWithHash').notNullable()
    table.string('url').notNullable()
    table.timestamp('registered_at').defaultTo(new Date(new Date().toUTCString()))

  })
    .createTable('content_desc', (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.string('type').notNullable()
      table.string('category').notNullable()
      table.string('title').notNullable()
      table.string('desc').notNullable()
      table.string('content_id').notNullable()
      table.timestamp('registered_at').defaultTo(new Date(new Date().toUTCString()))


      table.foreign('content_id').references('id').inTable('content')
    })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('content')
    .dropTable('content_desc')
}
