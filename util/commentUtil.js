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
        // const comment =  this._Comment
        // .query()
        // .where('comment_id', commentId)

        return this._withReferrnces(commentInstance,references)
        // .where('comment_id',commentId)
        // .fetch()
        // .then(response => response.first())
    }

    async deleteById(commentInstance){
        const { id } = commentInstance.params
        const comments = await this._Comment.find(id)

        if(!comments){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }
        comments.delete()
        await comments.save();

        return {status : 200 ,error : undefined , data : 'complete'};
    }

    async updateById(commentInstance,references){
        const { id } = commentInstance.params
        let comments = await this._Comment.find(id)

        if(!comments){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }

        comments.merge(commentInstance.body)
        await comments.save();
    
        comments = this._Comment.query()
        
        return this._withReferrnces(comments,references).fetch().then(response => response.first())
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