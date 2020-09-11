'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static get primaryKey(){
        return 'post_id'
    }
    
    subjects(){
        return this.hasMany('App/Models/Subject')
    }
}

module.exports = Post
