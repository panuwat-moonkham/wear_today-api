'use strict'

const { test } = use('Test/Suite')('User Validator')
const userValidator = require('../../service/UserValidator')

test('should return error when pass incorrect data', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username: "adgdg",
    email: "wrong email"
  })
  assert.isArray(validatedData.error)
})

test('should return only one error if single incorrect data is passed', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username:"adgdg",
    email: "email",
    password: "123456789"
  })
  assert.equal(validatedData.error.length, 1)
})

test('should return more than one error if pass many incorrect data', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "",
    last_name: "Doe",
    username:"username",
    email: "wrong email",
    password: "1234"
  })
  assert.isAbove(validatedData.error.length, 1)
})

test('should return undefined when pass correct data', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username:"adgdg",
    email: "john@mail.com",
    password: "123456789"
  })

  assert.equal(validatedData.error, undefined)
})

test('should return only one error if pass incorrect password', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username:"adgdg",
    email: "john@mail.com",
    password: "1"
  })
  assert.equal(validatedData.error.length, 1)
})
test('should return error if pass not unique username', async ({ assert }) => {
  const validatedData = await userValidator({
    first_name: "John",
    last_name: "Doe",
    username:"adgdg",
    email: "john@mail.com",
    password: "123454"
  })
  assert.isOk(validatedData.error)
})
