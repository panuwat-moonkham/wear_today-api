'use strict'

const {test} = use('Test/Suite')('Post Validator')
const postValidator = require('../../service/PostValidator')

test('should return error if pass incorrect data', async ({assert}) => {
  const validateData = await postValidator({
    post_title: '',
    user_id: '1'
  })
  assert.isOk(validateData.error);
})

test('should return only one error if pass single incorrect data', async ({assert}) => {
    const validatedData = await postValidator({
        post_title: '',
        user_id: '1'
    })
    assert.equal(validatedData.error.length, 1)
})

test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await postValidator({
        post_title: '90s style',
        user_id: '1'
    })
    assert.equal(validatedData.error, undefined)
})

test('should return object when pass correct data ', async ({assert}) => {
    const validatedData = await postValidator({
        post_title: '90s style' ,
        user_id: '1'
    })
    assert.isObject(validatedData);
})
  