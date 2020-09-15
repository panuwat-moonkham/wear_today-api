'use strict'

const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator")
const PhotoValidator = require("../../../service/PhotoValidator")
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
        NumberTypeParamValidator(id)

        const photoUtil = new PhotoUtil(Photo)
        const photos =await photoUtil.getById(id,references)
      
        return{ status: 200, error : undefined, data : photos ||{} }
    }
    
    async store ({request}){
        const {category_image,
          shirt_image,
          pants_image,
          shoes_image,
          jacket_image,
          hat_image,
          accessories_image} = request.body
        const { references } = request.qs
    
        const validation = await PhotoValidator(request.body)
      
        if(validation.error){
        return {status: 422, 
          error: validation.error,
          data: undefined}
      }

        const photoUtil = new PhotoUtil(Photo)
        const photo = await photoUtil.create({category_image,
          shirt_image,
          pants_image,
          shoes_image,
          jacket_image,
          hat_image,
          accessories_image},references)
        return {status : 200,error : undefined , data : photo }
    }
    
    async update({ request }) {
      const {references = undefined} =request.qs
      const validation = await PhotoValidator(request.body)
    
    if(validation.error){
      return {status: 422, 
        error: validation.error,
        data: undefined}
    }
      const photoUtil = new PhotoUtil(Photo)
      const photos = await photoUtil
      .updateById(request,references)
        
        return { status: 200, error: undefined, data: photos }
          }
    
    async destroy({request}){
      const {references = undefined} =request.qs
      const photoUtil = new PhotoUtil(Photo)
      const photo = await photoUtil.deleteById(request,references)
        
        return {status: 200, error: undefined, data: {massage: 'success' }}
        }
}

module.exports = PhotoController
