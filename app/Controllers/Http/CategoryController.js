'use strict'

const Database = use('Database')
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

    const categoryUtil = new CategoryUtil(Category)
    const category = await categoryUtil.create({category_name,
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
    const {body,params} = request
    const {id} = params
    const {category_name,
        category_detail,
        shirt_detail,
        pants_detail,
        shoes_detail,
        jacket_detail,
        hat_detail,
        accessories_detail} = body

    const categoryId = await Database
    .table('categories')
    .where({category_id:id})
    .update({category_name,
        category_detail,
        shirt_detail,
        pants_detail,
        shoes_detail,
        jacket_detail,
        hat_detail,
        accessories_detail})

    const category = await Database
    .table('categories')
    .where({category_id: categoryId})
    .first()

    return {status: 200, error: undefined, data: category }
}

async destroy({request}){
    const {id} = request.params

    await Database
    .table('categories')
    .where({category_id:id})
    .delete()

    return {status: 200, error: undefined, data: {massage: 'success' }}
}
}

module.exports = CategoryController
