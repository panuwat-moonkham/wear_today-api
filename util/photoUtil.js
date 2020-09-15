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

    async deleteById(photoInstance){
        const { id } = photoInstance.params
        const photos = await this._Photo.find(id)

        if(!photos){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }
        photos.delete()
        await photos.save();

        return {status : 200 ,error : undefined , data : 'complete'};
    }

    async updateById(photoInstance,references){
        const { id } = photoInstance.params
        let photos = await this._Photo.find(id)

        if(!photos){
            return {status : 500 ,error : `Not Found ${id}` , data : undefined};
        }

        photos.merge(photoInstance.body)
        await photos.save();
    
        photos = this._Photo.query().where({photo_id : id})
        
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


module.exports = PhotoUtil