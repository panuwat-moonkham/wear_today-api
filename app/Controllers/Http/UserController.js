'use strict'

const Database = use('Database')
const UserUtil = require("../../../util/userUtil")
const User = use('App/Models/User')

class UserController {
  async index({request}){
    const {references = undefined} = request.qs
    const userUtil = new UserUtil(User)
    const users = await userUtil.getAll(references)

    return { status : 200 , error : undefined, data : users}
    }

async show({request}){
    const { id } = request.params
    const { references } = request.qs
    const userUtil = new UserUtil(User)
    const users =await userUtil.getById(id,references)
  
    return{ status: 200, error : undefined, data : users ||{} }
}

async store ({request}){
    const {first_name,last_name,user_name,email,password} = request.body
    const { references } = request.qs

    const userUtil = new UserUtil(User)
    const user = await userUtil.create({first_name,last_name,user_name,email,password},references)
    return {status : 200,error : undefined , data : user }
}

async update({ request }) {
    const { body, params } = request
    const { id } = params
    const { first_name,last_name,username,email,password} = body
    
    const userId = await Database
      .table('users')
      .where({ user_id: id })
      .update({ first_name,last_name,username,email,password})

    const user = await Database
      .table('users')
      .where({ user_id: userId })
      .first()
    
    return { status: 200, error: undefined, data: user }
      }

async destroy({request}){
    const {id} = request.params
    
    await Database
      .table('users')
      .where({user_id:id})
      .delete()
    
    return {status: 200, error: undefined, data: {massage: 'success' }}
    }
}

module.exports = UserController