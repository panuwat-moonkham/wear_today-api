const Validator = use("Validator")

module.exports = async function postValidator (data) {
  if (typeof data !== 'object') throw new Error()

  const { post_title,description} = data

  const rules = {
    post_title: 'required',
    description: 'required'
  }

  const validation = await Validator.validateAll({
    post_title,description
  }, rules)

  return {
    error: validation.messages()
  }
}