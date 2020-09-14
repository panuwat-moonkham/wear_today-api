'use strict'

const {test} = use('Test/Suite')('Photo Validator')
const photoValidator = require('../../service/PhotoValidator')

test('should return error if pass incorrect data', async ({assert}) => {
    const validatedData = await photoValidator({
        category_image: '1',
        shirt_image: '',
        pants_image: '1',
        shoes_image: '',
        jacket_image: '1',
        hat_image: '1',
        accessories_image: ''
    })
    assert.isOk(validatedData.error);
  })

test('should return only one error if pass incorrect data', async ({assert}) => {
    const validatedData = await photoValidator({
        category_image: '1',
        shirt_image: '1',
        pants_image: '1',
        shoes_image: '1',
        jacket_image: '1',
        hat_image: '1',
        accessories_image: ''
    })
    assert.equal(validatedData.error.length, 1)
  })

test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await photoValidator({
        category_image: '1',
        shirt_image: '1',
        pants_image: '1',
        shoes_image: '1',
        jacket_image: '1',
        hat_image: '1',
        accessories_image: '1'
    })
    assert.equal(validatedData.error, undefined)
  })

test('should return object when pass correct data ', async ({assert}) => {
  const validatedData = await photoValidator({
        category_image: '1',
        shirt_image: '1',
        pants_image: '1',
        shoes_image: '1',
        jacket_image: '1',
        hat_image: '1',
        accessories_image: '1'
    })
    assert.isObject(validatedData);
  })

  test('should return more than one error if pass many incorrect data', async ({ assert }) => {
    const validatedData = await photoValidator({
        category_image: '1',
        shirt_image: '',
        pants_image: '1',
        shoes_image: '',
        jacket_image: '1',
        hat_image: '1',
        accessories_image: ''
    })
    assert.isAbove(validatedData.error.length, 1)
  })