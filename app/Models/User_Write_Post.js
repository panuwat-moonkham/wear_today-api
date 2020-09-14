'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User_Write_Post extends Model {
  static get primaryKey () {
    return 'id'
  }
}

module.exports = User_Write_Post