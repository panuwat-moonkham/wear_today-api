
module.exports = async function numberTypeParamValidator (number) {
    if (Number.isNaN(parseInt(number)))
      return { error: `param: ${number} is not supported, please use number type param instead.` }
  
    return {error: validation.messages()}
  }