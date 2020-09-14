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
    .createMany(20)

    const comments = await Factory
    .model('App/Models/Comment')
    .createMany(20)

    const posts = await Factory
    .model('App/Models/Post')
    .makeMany(20)

    let counter2 = 0;
    for (const user of users) {
      await user.post().save(posts[counter2]);

      counter2++;
    }
    let counter3 = 0;
    for (const comment of comments) {
      await comment.post().save(posts[counter3]);

      counter3++;
    }

    const categories = await Factory
    .model('App/Models/Category')
    .makeMany(20)

    let counter = 0;
    for (const photo of photos) {
      await photo.category().save(categories[counter]);

      counter++;
    }
    let counter4 = 0;
    for (const post of posts) {
      await post.category().save(categories[counter4]);

      counter4++;
    }
   }
}

module.exports = DatabaseSeeder
