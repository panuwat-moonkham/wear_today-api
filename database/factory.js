'use strict'

const Hash = use('Hash')


/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    username : faker.first(),
    email: faker.email(),
    password : faker.word({length : 10})
  }
})

Factory.blueprint('App/Models/Photo', (faker) => {
  return {
    category_image: faker.word({ syllables: 3 }),
    shirt_image: faker.word({ syllables: 3 }),
    pants_image: faker.word({ syllables: 3 }),
    shoes_image: faker.word({ syllables: 3 }),
    jacket_image: faker.word({ syllables: 3 }),
    hat_image: faker.word({ syllables: 3 }),
    accessories_image: faker.word({ syllables: 3 })
  }
})

Factory.blueprint('App/Models/Comment', (faker) => {
  return {
    comment_content: faker.sentence({ words: 10 })
  }
})

Factory.blueprint('App/Models/Category', (faker) => {
    return {
      category_name: faker.sentence({ words: 2 }),
      category_detail: faker.sentence({ words: 2 }),
      shirt_detail: faker.sentence({ words: 2 }),
      pants_detail: faker.sentence({ words: 2 }),
      shoes_detail: faker.sentence({ words: 2 }),
      jacket_detail: faker.sentence({ words: 2 }),
      hat_detail: faker.sentence({ words: 2 }),
      accessories_detail: faker.sentence({ words: 2 })
    }
  })

  Factory.blueprint('App/Models/Post', (faker) => {
    return {
      post_title: faker.sentence({ words: 2 }),
      description: faker.sentence({ words: 8 })
    }
  })