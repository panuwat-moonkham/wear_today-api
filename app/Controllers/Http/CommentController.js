'use strict'

const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator")
const CommentValidator = require("../../../service/CommentValidator")
const CommentUtil = require("../../../util/commentUtil")
const Comment = use('App/Models/Comment')

class CommentController {
  async index({request}){
    const {references = undefined} = request.qs
    const commentUtil = new CommentUtil(Comment)
    const comments = await commentUtil.getAll(references)

    return { status : 200 , error : undefined, data : comments}
    }

async show({request}){
    const { id } = request.params
    const { references } = request.qs
    NumberTypeParamValidator(id)

    const commentsUtil = new CommentUtil(Comment)
    const comments =await commentsUtil.getById(id,references)
  
    return{ status: 200, error : undefined, data : comments ||{} }
}

async store ({request}){
    const {comment_content} = request.body
    const { references } = request.qs
    const validation = await CommentValidator(request.body)

    if(validation.error){
      return {status: 422, 
        error: validation.error,
        data: undefined}
    }

    const commentUtil = new CommentUtil(Comment)
    const comment = await commentUtil.create({comment_content},references)
    return {status : 200,error : undefined , data : comment }
}

async update({ request }) {
  const {references = undefined} =request.qs
  const validation = await CommentValidator(request.body)

if(validation.error){
  return {status: 422, 
    error: validation.error,
    data: undefined}
}
  const commentUtil = new CommentUtil(Comment)
  const comments = await commentUtil
  .updateById(request,references)
    
    return { status: 200, error: undefined, data: comments }
      }

async destroy({request}){
    const {references = undefined} =request.qs
    const commentUtil = new CommentUtil(Comment)
    const comment = await commentUtil.deleteById(request,references)
    
    return {status: 200, error: undefined, data: {massage: 'success' }}
    }
}

module.exports = CommentController
