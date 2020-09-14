const CommentUtil = require("../../util/commentUtil")
const Comment = use('App/Models/Comment')
const { test } = use("Test/Suite")("Comment Util")


test("should get more than one when get many comments", async ({ assert }) => {
    const commentUtil = new CommentUtil(Comment)
    const comments = await commentUtil.getAll()
    assert.isAbove(comments.rows.length, 1)
})

test("should return object created from CommentUtil.", async ({assert}) => {
    const comment =  new CommentUtil(Comment)
    const {comment_id} = await comment.getById(1)
    assert.isOk(comment)
})