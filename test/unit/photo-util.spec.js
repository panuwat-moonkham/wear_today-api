const PhotoUtil = require("../../util/photoUtil")
const Photo = use('App/Models/Photo')
const { test } = use("Test/Suite")("Photo Util")


test("should get more than one when get many photos", async ({ assert }) => {
    const photoUtil = new PhotoUtil(Photo)
    const photos = await photoUtil.getAll()
    assert.isAbove(photos.rows.length, 1)
})

test("should return object created from photoUtil.", async ({assert}) => {
    const photo =  new PhotoUtil(Photo)
    const {photo_id} = await photo.getById(1)
    assert.isOk(photo)
})

