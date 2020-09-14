'use strict'

const {test} = use('Test/Suite')('Category Validator')
const categoryValidator = require('../../service/CategoryValidator')

test('should return error if pass incorrect data', async ({assert}) => {
    const validatedData = await categoryValidator({
        category_name: '1',
        category_detail: '',
        shirt_detail: '1',
        pants_detail: '',
        shoes_detail: '1',
        jacket_detail: '',
        hat_detail: '1',
        accessories_detail: '1'
    })
    assert.isOk(validatedData.error);
  })

test('should return only one error if pass incorrect data', async ({assert}) => {
    const validatedData = await categoryValidator({
        category_name: '',
        category_detail: '1',
        shirt_detail: '1',
        pants_detail: '1',
        shoes_detail: '1',
        jacket_detail: '1',
        hat_detail: '1',
        accessories_detail: '1'
    })
    assert.equal(validatedData.error.length, 1)
  })

test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await categoryValidator({
        category_name: '1',
        category_detail: '1',
        shirt_detail: '1',
        pants_detail: '1',
        shoes_detail: '1',
        jacket_detail: '1',
        hat_detail: '1',
        accessories_detail: '1'
    })
    assert.equal(validatedData.error, undefined)
  })

test('should return object when pass correct data ', async ({assert}) => {
  const validatedData = await categoryValidator({
        category_name: '1',
        category_detail: '1',
        shirt_detail: '1',
        pants_detail: '1',
        shoes_detail: '1',
        jacket_detail: '1',
        hat_detail: '1',
        accessories_detail: '1'
    })
    assert.isObject(validatedData);
  })

  test('should return more than one error if pass many incorrect data', async ({ assert }) => {
    const validatedData = await categoryValidator({
        category_name: '1',
        category_detail: '',
        shirt_detail: '1',
        pants_detail: '1',
        shoes_detail: '',
        jacket_detail: '1',
        hat_detail: '1',
        accessories_detail: ''
    })
    assert.isAbove(validatedData.error.length, 1)
  })