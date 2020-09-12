'use strict'

const Database = use('Database')
const Photo = use('App/Models/Photo')
const PhotoUtil = require("../../../util/photoUtil")

class PhotoController {
    async index({request}){
        const {references = undefined} = request.qs
        const photoUtil = new PhotoUtil(Photo)
        const photos = await photoUtil.getAll(references)
    
        return { status : 200 , error : undefined, data : photos}
        }
    
    async show({request}){
        const { id } = request.params
        const { references } = request.qs
        const photoUtil = new PhotoUtil(Photo)
        const photos =await photoUtil.getById(id,references)
      
        return{ status: 200, error : undefined, data : photos ||{} }
    }
    
    async store ({request}){
        const {category_image,shirt_image,pants_image,shoes_image,jacket_image,hat_image,accessories_image} = request.body
        const { references } = request.qs
    
        const photoUtil = new PhotoUtil(Photo)
        const photo = await photoUtil.create({category_image,shirt_image,pants_image,shoes_image,jacket_image,hat_image,accessories_image},references)
        return {status : 200,error : undefined , data : photo }
    }
    
    async update({ request }) {
        const { body, params } = request
        const { id } = params
        const { category_image,shirt_image,pants_image,shoes_image,jacket_image,hat_image,accessories_image} = body
        
        const photoId = await Database
          .table('photos')
          .where({ photo_id: id })
          .update({ category_image,shirt_image,pants_image,shoes_image,jacket_image,hat_image,accessories_image})
    
        const photo = await Database
          .table('photos')
          .where({ photo_id: photoId })
          .first()
        
        return { status: 200, error: undefined, data: photo }
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

module.exports = PhotoController
