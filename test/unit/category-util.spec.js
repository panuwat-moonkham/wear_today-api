const CategoryUtil = require("../../util/categoryUtil")
const Category = use('App/Models/Category')
const { test } = use("Test/Suite")("Category Util")


test("should get more than one when get many Categories", async ({ assert }) => {
    const categoryUtil = new CategoryUtil(Category)
    const categories = await categoryUtil.getAll()
    assert.isAbove(categories.rows.length, 1)
})

test("should return object created from CategoryUtil.", async ({assert}) => {
    const category =  new CategoryUtil(Category)
    const {category_id} = await category.getById(1)
    assert.isOk(category)
})
