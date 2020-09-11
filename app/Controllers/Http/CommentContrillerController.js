'use strict'

const CommentUtil = require("../../../util/commentUtil")
const Comment = use('App/Models/Comment')

class CommentContrillerController {
    async index () {
        const comments = await Comment.all()
    
        return { status: 200, error: undefined, data: comments }
      }
    
    async show ({ request }) {
        const { id } = request.params
    
        const validatedValue = numberTypeParamValidator(id)
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined }
    
        const  comment = await  Comment.find(id)
    
        return { status: 200, error: undefined, data:  comment || {} }
      }

    async store ({ request }) {
        const {comment_content } = request.body
    
        const validatedData = await ProfileValidator(request.body)
    
        if (validatedData.error)
          return { status: 422, error: validatedData.error, data: undefined }
        
        const comment = await Database
          .table('comments')
          .insert({comment_content})
    
        return { status: 200, error: undefined, data: comment }
      }

    async update({ request }) {
        const { body, params } = request
        const { id } = params
        const { comment_content} = body
    
        const commentId = await Database
          .table('comments')
          .where({ comment_id: id })
          .update({ comment_content})
    
        const comment = await Database
          .table('comments')
          .where({ comment_id: commentId })
          .first()
    
        return { status: 200, error: undefined, data: comment }
      }
}

module.exports = CommentContrillerController
