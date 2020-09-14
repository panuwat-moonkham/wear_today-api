'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static get primaryKey(){
        return 'post_id'
    }
    // static get createdAtColumn(){
    //     return null;
    // }

    // static get updatedAtColumn(){
    //     return null;
    // }
    user(){
        return this.hasMany('App/Models/User')
    }
    comment(){
        return this.belongsTo('App/Models/Comment')
    }
    category(){
        return this.belongsTo('App/Models/Category')
    }
}

module.exports = Post
