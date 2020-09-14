'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Photo extends Model {
    static get primaryKey(){
        return 'photo_id'
    }
    // static get createdAtColumn(){
    //     return null;
    // }

    // static get updatedAtColumn(){
    //     return null;
    // }
    category(){
        return this.hasOne('App/Models/Category')
    }
}

module.exports = Photo
