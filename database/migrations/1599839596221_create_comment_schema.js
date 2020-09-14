'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments('comment_id')
      table.string('comment_content',150).notNullable()
      table.timestamp('comment_date').default(this.fn.now())
      table.timestamps()

    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CreateCommentSchema
