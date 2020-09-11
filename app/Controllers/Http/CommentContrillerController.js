'use strict'

const Database = use('Database')


class CommentContrillerController {
    async index(){
        const comment = await Database.table('comments')

        return { status : 200 , error : undefined, data : comment}
    }

    async show({request}){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if(validatedValue.error) return {status: 500, error : validatedValue.error, data : undefined}

        const comment = await Database
        .select('*')
        .from('comments')
        .where("comment_id",id)
        .first()

        return{ status: 200, error : undefined, data : comment ||{} }
    }

    async store ({request}){
        const {first_name,last_name,email,user_name,password} = request.body

        if(validation.fails())
            return {status: 422, error: validation.messages(), data: undefined}

        const post = await Post
        .create({first_name,last_name,email,user_name,password})

        return {status : 200,error : undefined , data : post }
    }

    async update({request}){
        const {body,params} = request
        const {id} = params
        const {first_name,last_name,email} = body

        const postId = await Database
        .table('posts')
        .where({post_id:id})
        .update({first_name,last_name,email})

        const teacher = await Database
        .table('posts')
        .where({post_id: postId})
        .first()

        return {status: 200, error: undefined, data: teacher }
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

module.exports = CommentContrillerController
