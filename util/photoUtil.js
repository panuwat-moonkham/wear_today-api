
const Photo = require("../app/Models/Photo")

class PhotoUtil {
    constructor(PhotoModel){
        this._Photo = PhotoModel
    }

    getAll(references){
        const photos = this._Photo.query()

        return this._withReferrnces(photos).fetch()
    }

    getById(photoId,references){
        const photo = this._Photo
        .query()
        .where('photo_id', photoId)

        return this._withReferrnces(photo)
        .fetch()
        .then(response => response.first())
    }
    async create(photoInstance, references){
        const photoId = await Photo.create(photoInstance)
        const photo =  this._Photo
        .query()
        .where('photo_id', photoId)

        return this._withReferrnces(photo,references)
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