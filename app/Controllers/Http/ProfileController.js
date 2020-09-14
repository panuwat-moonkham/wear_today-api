'use strict'

const Database = use('Database')
const Hash = use('Hash')
// const ProfileValidator = require('../../../service/ProfileValidator')

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number)))
    return { error: `param: ${number} is not supported, please use number type param instead.` }

  return {}
}

class ProfileController {
    async index () {
        const profiles = await Profile.all()
    
        return { status: 200, error: undefined, data: profiles }
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
        const { first_name, last_name, email, password } = request.body
    
        // const validatedData = await ProfileValidator(request.body)
    
        // if (validatedData.error)
          // return { status: 422, error: validatedData.error, data: undefined }
    
        const hashedPassword = await Hash.make(password)
    
        const profile = await Database
          .table('profiles')
          .insert({ first_name, last_name, email, password: hashedPassword, status })
    
        return { status: 200, error: undefined, data: { first_name, last_name, email, status } }
      }

    async update({ request }) {
        const { body, params } = request
        const { id } = params
        const { first_name, last_name, email, status } = body
    
        const profileId = await Database
          .table('profiles')
          .where({ profile_id: id })
          .update({ first_name, last_name, email, status })
    
        const profile = await Database
          .table('profiles')
          .where({ profile_id: profileId })
          .first()
    
        return { status: 200, error: undefined, data: profile }
      }

    async destroy({ request }) {
        const { id } = request.params
    
        await Database
          .table('profiles')
          .where({ profile_id: id })
          .delete()
    
        return { stauts: 200, error: undefined, data: { message: 'success' } }
      }
}

module.exports = ProfileController
