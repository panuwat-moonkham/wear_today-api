'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments('user_id')
      table.string('first_name')
      table.string('last_name')
      table.string('e-mail').unique()
      table.string('username').unique()
      table.string('password')
      table.string('status').default('user')
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
