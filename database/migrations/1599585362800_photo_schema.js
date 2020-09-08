'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotoSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments('photo_id')
      table.string('category_name')
      table.string('category_image')
      table.string('shirt_image')
      table.string('pants_image')
      table.string('shoes_image')
      table.string('jacket_image')
      table.string('hat_image')
      table.string('accessories_image')
      table.integer('category_id').unsigned()
      table.timestamps()

      table
      .foreign('category_id')
      .references('category.category_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotoSchema
