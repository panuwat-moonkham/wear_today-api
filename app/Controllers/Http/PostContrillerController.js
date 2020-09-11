'use strict'

const Post = require("../../Models/Post")

const Database = use('Database')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) 
        return { error: ` param: ${number} is not support, Pleasr use number type param instead.` }

    return {}
}
class PostContrillerController {
    async index(){
        const post = await Database.table('posts')

        return { status : 200 , error : undefined, data : post}
    }

    async show({request}){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if(validatedValue.error) return {status: 500, error : validatedValue.error, data : undefined}

        const post = await Database
        .select('*')
        .from('posts')
        .where("post_id",id)
        .first()

        return{ status: 200, error : undefined, data : post ||{} }
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

module.exports = PostContrillerController
