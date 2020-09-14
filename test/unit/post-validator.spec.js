'use strict'

const {test} = use('Test/Suite')('Post Validator')
const postValidator = require('../../service/PostValidator')

test('should return error if pass incorrect data', async ({assert}) => {
  const validateData = await postValidator({
    post_title: '',
    description: 'ssss'
  })
  assert.isOk(validateData.error);
})

test('should return only one error if pass single incorrect data', async ({assert}) => {
    const validatedData = await postValidator({
        post_title: '90s style',
        description: ''
    })
    assert.equal(validatedData.error.length, 1)
})

test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await postValidator({
        post_title: '90s style',
        description: 'saaaaaaaaaaa'
    })
    assert.equal(validatedData.error, undefined)
})

test('should return object when pass correct data ', async ({assert}) => {
    const validatedData = await postValidator({
        post_title: '90s style' ,
        description: 'saaaaaaaaaaa'
    })
    assert.isObject(validatedData);
})

test('should return more than one error if pass many incorrect data', async ({ assert }) => {
    const validatedData = await postValidator({
        post_title: '' ,
        description: ''
    })
    assert.isAbove(validatedData.error.length, 1)
  })