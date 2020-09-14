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
    category(){
        return this.hasOne('App/Models/Category')
    }

    comment(){
        return this.belongsTo('App/Models/Comment')
    }
    
    user(){
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Post
