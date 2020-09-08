'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DetailSchema extends Schema {
  up () {
    this.create('details', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('details')
  }
}

module.exports = DetailSchema
