'use strict'

const UserValidator = require("../../../service/UserValidator")
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
    const validation = await UserValidator(request.body)
      if(validation.error){
        return {status: 422, 
          error: validation.error,
          data: undefined}
      }
    const userUtil = new UserUtil(User)
    const user = await userUtil.create({first_name,last_name,user_name,email,password},references)
    return {status : 200,error : undefined , data : user }
}

async update({ request }) {
    const {references = undefined} =request.qs
    const validation = await UserValidator(request.body)

  if(validation.error){
    return {status: 422, 
      error: validation.error,
      data: undefined}
  }
  const userUtil = new UserUtil(User)
  const users = await userUtil
  .updateById(request,references)
    
    return { status: 200, error: undefined, data: users }
      }

async destroy({request}){
  const {references = undefined} =request.qs
  const userUtil = new UserUtil(Account)
  const user = await userUtil.deletById(request,references)

    return {status: 200, error: undefined, data: {massage: 'success' }}
    }
}

module.exports = UserController