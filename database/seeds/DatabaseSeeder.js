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

    const categories = await Factory
    .model('App/Models/Category')
    .createMany(20)

    let currentCategoryIndex = 0;
    const categoryPerIteration = 2;

    for(const category of categories){
      const selectedCategories = categories.slice(
        currentCategoryIndex,
        currentCategoryIndex + categoryPerIteration
      )
      await photos
      .categories()
      .saveMany(selectedCategories)

      currentCategoryIndex += categoryPerIteration
    }

    const posts = await Factory
    .model('App/Models/Post')
    .createMany(40)

    // let currentSubjectIndex = 0;
    // const subjectPerIteration = 2;

    // for(const teacher of teachers){
    //   const selectedSubjects = subjects.slice(
    //     currentSubjectIndex,
    //     currentSubjectIndex + subjectPerIteration
    //   )
    //   await teacher
    //   .subjects()
    //   .saveMany(selectedSubjects)

    //   currentSubjectIndex += subjectPerIteration
    // }// let currentSubjectIndex = 0;
    // const subjectPerIteration = 2;

    // for(const teacher of teachers){
    //   const selectedSubjects = subjects.slice(
    //     currentSubjectIndex,
    //     currentSubjectIndex + subjectPerIteration
    //   )
    //   await teacher
    //   .subjects()
    //   .saveMany(selectedSubjects)

    //   currentSubjectIndex += subjectPerIteration
    // }

    // let currentSubjectIndex = 0;
    // const subjectPerIteration = 2;

    // for(const teacher of teachers){
    //   const selectedSubjects = subjects.slice(
    //     currentSubjectIndex,
    //     currentSubjectIndex + subjectPerIteration
    //   )
    //   await teacher
    //   .subjects()
    //   .saveMany(selectedSubjects)

    //   currentSubjectIndex += subjectPerIteration
    // }
  }
}

module.exports = DatabaseSeeder
