'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments('category_id')
      table.string('category_name',80).notNullable()
      table.string('category_detail')
      table.string('shirt_detail',150)
      table.string('pants_detail',150)
      table.string('shoes_detail',150)
      table.string('jacket_detail',150)
      table.string('hat_detail',150)
      table.string('accessories_detail',150)
      table.integer('photo_id').unsigned()
      table.integer('post_id').unsigned()
      table.timestamps()

      table
        .foreign('post_id')
        .references('posts.post_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

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

module.exports = CreateCategorySchema
