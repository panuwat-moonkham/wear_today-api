'use strict'

const {test} = use('Test/Suite')('Comment Validator')
const commentValidator = require('../../service/CommentValidator')

test('should return error if pass incorrect data', async ({assert}) => {
    const validatedData = await commentValidator({
      comment_content: ''
    })
    assert.isOk(validatedData.error);
  })

test('should return only one error if pass incorrect data', async ({assert}) => {
    const validatedData = await commentValidator({
        comment_content: ''
    })
    assert.equal(validatedData.error.length, 1)
  })

test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await commentValidator({
        comment_content: 'Good',
    })
    assert.equal(validatedData.error, undefined)
  })

test('should return object when pass correct data ', async ({assert}) => {
  const validatedData = await commentValidator({
        comment_content: 'Good',
    })
    assert.isObject(validatedData);
  })