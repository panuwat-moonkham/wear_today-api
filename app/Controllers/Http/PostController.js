'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const PostUtil = require("../../../util/postUtil")

class PostContrillerController {
  async index({request}){
    const {references = undefined} = request.qs
    const postUtil = new PostUtil(Post)
    const posts = await postUtil.getAll(references)

    return { status : 200 , error : undefined, data : posts}
    }

async show({request}){
    const { id } = request.params
    const { references } = request.qs
    const postUtil = new PostUtil(Post)
    const posts =await postUtil.getById(id,references)
  
    return{ status: 200, error : undefined, data : posts ||{} }
}

async store ({request}){
    const {post_title,description} = request.body
    const { references } = request.qs

    const postUtil = new PostUtil(Post)
    const post = await postUtil.create({post_title,description},references)
    return {status : 200,error : undefined , data : post }
}

async update({ request }) {
    const { body, params } = request
    const { id } = params
    const { post_title,description} = body
    
    const postId = await Database
      .table('posts')
      .where({ post_id: id })
      .update({ post_title,description})

    const post = await Database
      .table('posts')
      .where({ post_id: postId })
      .first()
    
    return { status: 200, error: undefined, data: post }
      }

async destroy({request}){
    const {id} = request.params
    
    await Database
      .table('posts')
      .where({post_id:id})
      .delete()
    
    return {status: 200, error: undefined, data: {massage: 'success' }}
    }
}

module.exports = PostController
