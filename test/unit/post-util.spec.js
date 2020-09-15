const PostUtil = require("../../util/postUtil")
const Post = use('App/Models/Post')
const { test } = use("Test/Suite")("Post Util")

test("should get more than one when get many posts", async ({ assert }) => {
    const postUtil = new PostUtil(Post)
    const posts = await postUtil.getAll()
    assert.isAbove(posts.rows.length, 1)
})

test("should return object created from PostUtil", async ({assert}) => {
    const post =  new PostUtil(Post)
    const {post_id} = await post.getById(2)
    assert.isOk(post)
})