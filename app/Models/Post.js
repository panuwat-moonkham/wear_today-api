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

    comment(){
        return this.belongsTo('App/Models/Comment')
    }
    users () {
          return this
            .belongsToMany('App/Models/User')
            .pivotModel('App/Models/User_Write_Post')
        }
    category(){
        return this.belongsTo('App/Models/Category')
    }

}

module.exports = Post
