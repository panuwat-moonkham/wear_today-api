const Validator = use("Validator")

module.exports = async function commentValidator (data) {
  if (typeof data !== 'object') throw new Error()

  const {category_name,
    category_detail,
    shirt_detail,
    pants_detail,
    shoes_detail,
    jacket_detail,
    hat_detail,
    accessories_detail} = data

  const rules = {
    category_name: 'required',
    category_detail: 'required',
    shirt_detail: 'required',
    pants_detail: 'required',
    shoes_detail: 'required',
    jacket_detail: 'required',
    hat_detail: 'required',
    accessories_detail: 'required'
  }

  const validation = await Validator.validateAll({
    category_name,
    category_detail,
    shirt_detail,
    pants_detail,
    shoes_detail,
    jacket_detail,
    hat_detail,
    accessories_detail
  }, rules)

  return {
    error: validation.messages()
  }
}