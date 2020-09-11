'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments('category_id')
      table.string('category_name',120)
      table.string('category_detail')
      table.string('shirt_detail')
      table.string('pants_detail')
      table.string('shoes_detail')
      table.string('jacket_detail')
      table.string('hat_detail')
      table.string('accessories_detail')
      table.integer('photo_id').unsigned()
      table.timestamps()

      table
      .foreign('photo_id')
      .references('photos.photo_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
