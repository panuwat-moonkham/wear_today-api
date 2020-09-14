'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateUserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('user_id')
      table.string('first_name', 120).notNullable()
      table.string('last_name', 120).notNullable()
      table.string('username', 120).notNullable().unique()
      table.string('email', 120).notNullable().unique()
      table.string('password', 100).notNullable()
      table.string('status', 50).defaultTo('user')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = CreateUserSchema
