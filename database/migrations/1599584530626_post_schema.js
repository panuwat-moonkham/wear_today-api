'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments('post_id')
      table.string('post_title')
      table.string('description')
      table.timestamp('post_date')this.fn.now()
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
    this.drop('posts')
  }
}

module.exports = PostSchema
