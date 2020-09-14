
class UserUtil {
    constructor(UserModel){
        this._User = UserModel
    }

    getAll(references){
        const users = this._User.query()
        return this._withReferrnces(users,references)
            .fetch()
            .then(response => response)
    }

    getById(id,references){
        const user = this._User
        .query()
        .where({user_id : id})

        return this._withReferrnces(user,references)
        .fetch()
        .then(response => response.first())
    }
    async create(request, references){
        const {user_id} =  await this._User.create(request.body)
        const users =  this._User
        .query()
        .where({user_id:user_id})

        return this._withReferrnces(users,references)
        .fetch()
        .then(response => response.first())
    }

    async deletById(request){
        const {id} = request.params
        const users = await this._User.find(id)

        if(!users){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }
        users.delete()
        await users.save();

        return {status : 200 ,error : undefined , data : 'complete'};
    }

    async updateById(request,references){
        const {id} = request.params
        let users = await this._User.find(id)

        if(!users){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }

        users.merge(userrequest.body)
        await users.save();
    
        users = this._User
        .query()
        .where({user_id : id})
        
        return this._withReferences(users,references)
        .fetch()
        .then(response => response
        .first())
    }

    _withReferrnces(request,references){
        if(references){
            const extractedReferences = references.split(",")
            request.with(extractedReferences)
        }
        return request;
    }    
}


module.exports = UserUtil