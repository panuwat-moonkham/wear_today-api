const Validator = use("Validator")

module.exports = async function userValidator (data) {
  if (typeof data !== 'object') throw new Error()

  const { first_name, last_name, email, username, password } = data

  const rules = {
    first_name: 'required',
    last_name: 'required',
    email: 'required|email|unique:users,email',
    username: 'required',
    password: 'required|min:8'
  }

  const validation = await Validator.validateAll({
    first_name, last_name, username, email,  password
  }, rules)

  return {
    error: validation.messages()
  }
}