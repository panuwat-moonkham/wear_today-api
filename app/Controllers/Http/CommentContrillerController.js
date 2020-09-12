'use strict'

const Database = use('Database')
const CommentUtil = require("../../../util/commentUtil")
const Comment = use('App/Models/Comment')

class CommentContrillerController {
  async index({request}){
    const {references = undefined} = request.qs
    const commentUtil = new CommentUtil(Comment)
    const comments = await commentUtil.getAll(references)

    return { status : 200 , error : undefined, data : comments}
    }

async show({request}){
    const { id } = request.params
    const { references } = request.qs
    const commentsUtil = new CommentUtil(Comment)
    const comments =await commentsUtil.getById(id,references)
  
    return{ status: 200, error : undefined, data : comments ||{} }
}

async store ({request}){
    const {comment_content} = request.body
    const { references } = request.qs

    const commentUtil = new CommentUtil(Comment)
    const comment = await commentUtil.create({comment_content},references)
    return {status : 200,error : undefined , data : comment }
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
