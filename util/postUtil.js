const Post = require("../app/Models/Post")

class PostUtil {
    constructor(PostModel){
        this._Post = PostModel
    }

    getAll(references){
        const posts = this._Post.query()

        return this._withReferrnces(posts).fetch()
    }

    getById(postId,references){
        const post = this._Post
        .query()
        .where('post_id', postId)

        return this._withReferrnces(post)
        .fetch()
        .then(response => response.first())
    }
    async create(postInstance, references){
        const postId = await Post.create(postInstance)
        const post =  this._Post
        .query()
        .where('post_id', postId)

        return this._withReferrnces(post,references)
        .fetch()
        .then(response => response.first())
    }

    async deletById(postInstance){
        const { id } = postInstance.params
        const posts = await this._Post.find(id)

        if(!posts){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }
        posts.delete()
        await posts.save();

        return {status : 200 ,error : undefined , data : 'complete'};
    }

    async updateById(postInstance,references){
        const { id } = postInstance.params
        let posts = await this._Post.find(id)

        if(!posts){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }

        posts.merge(postInstance.body)
        await posts.save();
    
        posts = this._Post.query().where({post_id : id})
        
        return this._withReferences(categories,references).fetch().then(response => response.first())
    }

    _withReferrnces(instance,references){
        if(references){
            const extractedReferences = references.split(",")
            instance.with(extractedReferences)
        }
        return instance
    }    
}


module.exports = PostUtil