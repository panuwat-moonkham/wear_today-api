'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    const users = await Factory
    .model('App/Models/User')
    .createMany(20)
  
    const photos = await Factory
    .model('App/Models/Photo')
    .createMany(40)

    const comments = await Factory
    .model('App/Models/Comment')
    .createMany(20)

    const categories = await Factory
    .model('App/Models/Category')
    .makeMany(20)

    let currentCategoryIndex = 0;
    const categoryPerIteration = 2;

    for(const photo of photos){
      const selectedCategories = categories.slice(
        currentCategoryIndex,
        currentCategoryIndex + categoryPerIteration
      )
      await photo
      .categories()
      .saveMany(selectedCategories)

      currentCategoryIndex += categoryPerIteration
    }

    const posts = await Factory
    .model('App/Models/Post')
    .makeMany(40)

    let currentPostIndex = 0;
    const postPerIteration = 2;

    for(const user of users){
      const selectedposts = posts.slice(
        currentPostIndex,
        currentPostIndex + postPerIteration
      )
      await user
      .posts()
      .saveMany(selectedposts)

      currentPostIndex += postPerIteration
    }
    
    let currentPostIndex2 = 0;
    const postPerIteration2 = 2;

    for(const comment of comments){
      const selectedposts2 = posts.slice(
        currentPostIndex2,
        currentPostIndex2 + postPerIteration2
      )
      await comment
      .posts()
      .saveMany(selectedposts2)

      currentPostIndex2 += postPerIteration2
    }

    let currentPostIndex3 = 0;
    const postPerIteration3 = 2;

    for(const category of categories){
      const selectedposts3 = posts.slice(
        currentPostIndex3,
        currentPostIndex3 + postPerIteration3
      )
      await category
      .posts()
      .saveMany(selectedposts3)

      currentPostIndex3 += postPerIteration3
    }
  }
}

module.exports = DatabaseSeeder
