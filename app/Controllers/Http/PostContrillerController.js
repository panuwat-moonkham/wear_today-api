'use strict'

const Post = require("../../Models/Post")

class PostContrillerController {
    async index () {
        const users = await User.all()
    
        return { status: 200, error: undefined, data: users }
      }
    
    async show ({ request }) {
        const { id } = request.params
    
        const validatedValue = numberTypeParamValidator(id)
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined }
    
        const  profile = await  Profile.find(id)
    
        return { status: 200, error: undefined, data:  profile || {} }
      }

    async store ({ request }) {
        const {  post_title, description } = request.body
    
        const validatedData = await ProfileValidator(request.body)
    
        if (validatedData.error)
          return { status: 422, error: validatedData.error, data: undefined }
        
        const user = await Database
          .table('users')
          .insert({ post_title, description})
    
        return { status: 200, error: undefined, data: user }
      }

    async update({ request }) {
        const { body, params } = request
        const { id } = params
        const {  post_title, description} = body
    
        const userId = await Database
          .table('users')
          .where({ profile_id: id })
          .update({  post_title, description})
    
        const user = await Database
          .table('users')
          .where({ user_id: userId })
          .first()
    
        return { status: 200, error: undefined, data: user }
      }
}

module.exports = PostContrillerController
