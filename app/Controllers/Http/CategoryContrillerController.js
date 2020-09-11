'use strict'

const Category = use('App/Models/Category')

class CategoryContrillerController {
    async index () {
        const categories = await Category.all()
    
        return { status: 200, error: undefined, data: categories }
      }
    
    async show ({ request }) {
        const { id } = request.params
    
        const validatedValue = numberTypeParamValidator(id)
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined }
    
        const  category = await  Category.find(id)
    
        return { status: 200, error: undefined, data:  category || {} }
      }

    async store ({ request }) {
        const { first_name, last_name, email,user_name, password } = request.body
    
        const validatedData = await ProfileValidator(request.body)
    
        if (validatedData.error)
          return { status: 422, error: validatedData.error, data: undefined }
        
        const category = await Database
          .table('categories')
          .insert({category_name,
            category_detail,
            shirt_detail,
            pants_detail,
            shoes_detail,
            acket_detail,
            hat_detail,
            accessories_detail})
    
        return { status: 200, error: undefined, data: category }
      }

    async update({ request }) {
        const { body, params } = request
        const { id } = params
        const { category_name,
            category_detail,
            shirt_detail,
            pants_detail,
            shoes_detail,
            acket_detail,
            hat_detail,
            accessories_detail} = body
    
        const categoryId = await Database
          .table('categories')
          .where({ profile_id: id })
          .update({ category_name,
            category_detail,
            shirt_detail,
            pants_detail,
            shoes_detail,
            acket_detail,
            hat_detail,
            accessories_detail })
    
        const category = await Database
          .table('categories')
          .where({ user_id: categoryId })
          .first()
    
        return { status: 200, error: undefined, data: category }
      }
}

module.exports = CategoryContrillerController
