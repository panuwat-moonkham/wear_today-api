'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments('category_id')
      table.string('category_name')
      table.string('category_detail')
      table.string('shirt_detail')
      table.string('pants_detail')
      table.string('shoes_detail')
      table.string('jacket_detail')
      table.string('hat_detail')
      table.string('accessories_detail')
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
