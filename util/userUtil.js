
class UserUtil {
    constructor(UserModel){
        this._User = UserModel
    }

    getAll(references){
        const users = this._User.query()

        return this._withReferrnces(users).fetch()
    }

    getById(userId,references){
        const user = this._User
        .query()
        .where('user_id', userId)

        return this._withReferrnces(user)
        .fetch()
        .then(response => response.first())
    }
    async create(userInstance, references){
        const userId = await User.create(userInstance)
        const user =  this._User
        .query()
        .where('user_id', userId)

        return this._withReferrnces(user,references)
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


module.exports = UserUtil