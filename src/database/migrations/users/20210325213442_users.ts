import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('phone').notNullable()
        table.timestamp('registered_at').defaultTo(new Date(new Date().toUTCString()))

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

