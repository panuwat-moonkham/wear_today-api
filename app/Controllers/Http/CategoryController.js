'use strict'

const NumberTypeParamValidator = require("../../../service/NumberTypeParamValidator")
const CategoryValidator = require("../../../service/CategoryValidator")
const Category = use('App/Models/Category')
const CategoryUtil = require("../../../util/categoryUtil")

class CategoryController {
  async index({request}){
    const {references = undefined} = request.qs
    const categoryUtil = new CategoryUtil(Category)
    const Categories = await categoryUtil.getAll(references)

    return { status : 200 , error : undefined, data : Categories}
    }

async show({request}){
    const { id } = request.params
    const { references } = request.qs
    NumberTypeParamValidator(references)

    const categoryUtil = new CategoryUtil(Category)
    const category =await categoryUtil.getById(id,references)
  
    return{ status: 200, error : undefined, data : category ||{} }
}

async store ({request}){
    const {category_name,
        category_detail,
        shirt_detail,
        pants_detail,
        shoes_detail,
        jacket_detail,
        hat_detail,
        accessories_detail} = request.body
    const { references } = request.qs
    const validation = await CategoryValidator(request.body)
      
    if(validation.error){
        return {status: 422, 
          error: validation.error,
          data: undefined}
      }

    const categoryUtil = new CategoryUtil(Category)
    const category = await categoryUtil.create({
        category_name,
        category_detail,
        shirt_detail,
        pants_detail,
        shoes_detail,
        jacket_detail,
        hat_detail,
        accessories_detail},references)
    return {status : 200,error : undefined , data : category }
}

async update({request}){
    const {references = undefined} =request.qs
    const validation = await CategoryValidator(request.body)
      
    if(validation.error){
        return {status: 422, 
          error: validation.error,
          data: undefined}
      }
        const categoytUtil = new CategoryUtil(Category)
        const category = await categoytUtil
        .updateById(request,references)

    return {status: 200, error: undefined, data: category }
}

async destroy({request}){
    const {references = undefined} =request.qs
    const categoryUtil = new CategoryUtil(Category)
    const catecory = await categoryUtil.deletById(request,references)
    
    return {status: 200, error: undefined, data: {massage: 'success' }}
}
}

module.exports = CategoryController
