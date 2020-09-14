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
    const user = await Factory
    .model('App/Models/User')
    .createMany(20)

    // const comment = await Factory
    // .model('App/Models/Subject')
    // .createMany(20)

    // const photo = await Factory
    // .model('App/Models/Group')
    // .createMany(20)

    // const category = await Factory
    // .model('App/Models/Category')
    // .createMany(20)

    // const post = await Factory
    // .model('App/Models/Post')
    // .createMany(20)

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
