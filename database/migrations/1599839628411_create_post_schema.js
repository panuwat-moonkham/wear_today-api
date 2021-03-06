'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments('post_id')
      table.string('post_title',80).notNullable()
      table.string('description')
      table.timestamp('post_date').default(this.fn.now())
      table.integer('comment_id').unsigned()
      table.integer('user_id').unsigned()
      table.timestamps()

      table
        .foreign('user_id')
        .references('users.user_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .foreign('comment_id')
        .references('comments.comment_id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = CreatePostSchema
