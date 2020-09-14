const Validator = use("Validator")

module.exports = async function photoValidator (data) {
  if (typeof data !== 'object') throw new Error()

  const {category_image,
    shirt_image,
    pants_image,
    shoes_image,
    jacket_image,
    hat_image,
    accessories_image} = data

  const rules = {
    category_image: 'required',
    shirt_image: 'required',
    pants_image: 'required',
    shoes_image: 'required',
    jacket_image: 'required',
    hat_image: 'required',
    accessories_image: 'required'
  }

  const validation = await Validator.validateAll({
    category_image,
    shirt_image,
    pants_image,
    shoes_image,
    jacket_image,
    hat_image,
    accessories_image
  }, rules)

  return {
    error: validation.messages()
  }
}