'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateUserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('user_id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.string('user_name', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = CreateUserSchema
