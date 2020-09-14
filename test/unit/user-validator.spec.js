'use strict'

const { test } = use('Test/Suite')('User Validator')
const userValidator = require('../../service/UserValidator')

test('should receive object as first parameter', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username: "adgdg",
    email: "wrong email",
  })
  assert.isOk(validatedData)

  const validatedData2 = await userValidator("John", "Doe","adgdg", "wrong email", "pass")
  assert.isNotOk(validatedData2)
})

test('should return error when pass incorrect data', async ({ assert }) => {
  const validatedData = await userValidator("John", "Doe","adgdg", "wrong email")
  assert.isArray(validatedData.error)
})

test('should return only one error if single incorrect data is passed', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username:"adgdg",
    email: "wrong email",
  })
  assert.equal(validatedData.error.length, 1)
})

test('should return more than one error if multiple incorrect data is passed', async ({ assert }) => {
  const validatedData = await userValidator("John", "Doe", "adgdg", "wrong email")
  assert.isAbove(validatedData.error.length, 1)
})

test('should return undefined when pass correct data', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username:"adgdg",
    email: "john@mail.com",
  })

  assert.equal(validatedData.error, undefined)
})