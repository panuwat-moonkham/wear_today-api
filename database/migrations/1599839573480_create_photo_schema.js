'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePhotoSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments('photo_id',150)
      table.string('category_image',150)
      table.string('shirt_image',150)
      table.string('pants_image',150)
      table.string('shoes_image',150)
      table.string('jacket_image',150)
      table.string('hat_image',150)
      table.string('accessories_image',150)
      table.timestamps()

    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = CreatePhotoSchema
