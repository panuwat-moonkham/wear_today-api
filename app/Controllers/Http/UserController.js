'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
    async index () {
        const users = await User.all()
    
        return { status: 200, error: undefined, data: users }
      }
    
    async show ({ request }) {
        const { id } = request.params
    
        const validatedValue = numberTypeParamValidator(id)
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined }
    
        const  profile = await  Profile.find(id)
    
        return { status: 200, error: undefined, data:  profile || {} }
      }

    async store ({ request }) {
        const { first_name, last_name, email,user_name, password } = request.body
    
        const validatedData = await ProfileValidator(request.body)
    
        if (validatedData.error)
          return { status: 422, error: validatedData.error, data: undefined }
        
        const user = await Database
          .table('users')
          .insert({ first_name, last_name, email,user_name, password})
    
        return { status: 200, error: undefined, data: user }
      }

    async update({ request }) {
        const { body, params } = request
        const { id } = params
        const { first_name, last_name, email,user_name} = body
    
        const userId = await Database
          .table('users')
          .where({ profile_id: id })
          .update({ first_name, last_name, email, status })
    
        const user = await Database
          .table('users')
          .where({ user_id: userId })
          .first()
    
        return { status: 200, error: undefined, data: user }
      }
}

module.exports = UserController
'use strict'