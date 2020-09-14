'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
    static get primaryKey(){
        return 'comment_id'
    }
    static get createdAtColumn(){
        return null;
    }

    static get updatedAtColumn(){
        return null;
    }
    post(){
        return this.hasMany('App/Models/Post')
    }
    
}

module.exports = Comment
