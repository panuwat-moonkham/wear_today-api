
const Comment = require("../app/Models/Comment")

class CommentUtil {
    constructor(CommentModel){
        this._Comment = CommentModel
    }

    getAll(references){
        const comments = this._Comment.query()

        return this._withReferrnces(comments).fetch()
    }

    getById(commentId,references){
        const comment = this._Comment
        .query()
        .where('comment_id', commentId)

        return this._withReferrnces(comment)
        .fetch()
        .then(response => response.first())
    }
    async create(commentInstance, references){
        const commentId = await Comment.create(commentInstance)
        const comment =  this._Comment
        .query()
        .where('comment_id', commentId)

        return this._withReferrnces(comment,references)
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


module.exports = CommentUtil