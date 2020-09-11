'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments('comment_id')
      table.string('comment_content')
      table.timestamp('comment_date').default(this.fn.now())
      table.integer('user_id').unsigned()
      table.integer('post_id').unsigned()
      table.timestamps()

      table
      .foreign('post_id')
      .references('post.category_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
