
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

    _withReferrnces(instance,references){
        if(references){
            const extractedReferences = references.split(",")
            instance.with(extractedReferences)
        }
        return instance
    }    
}


module.exports = SubjectUtil