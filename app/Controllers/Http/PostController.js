'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const PostUtil = require("../../../util/postUtil")

class PostController {
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
    const post = await postUtil.create({post_title,description,category_id},references)
    return {status : 200,error : undefined , data : post }
}

async update({ request }) {
  const {references = undefined} =request.qs
  const validation = await loginValidator(request.body)
      
  if(validation.error){
    return {status: 422, 
      error: validation.error,
      data: undefined}
  }
  const postUtil = new PostUtil(Post)
  const posts = await postUtil
    .updateById(request,references)
    
    return { status: 200, error: undefined, data: posts }
      }

async destroy({request}){
  const {references = undefined} =request.qs
  const postUtil = new PostUtil(Post)
  const post = await postUtil.deletById(request,references)
    
    return {status: 200, error: undefined, data: {massage: 'success' }}
    }
}

module.exports = PostController
