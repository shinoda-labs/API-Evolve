'use strict'

const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.newPost = async (data) => {
    let post = new Post(data)
    await post.save()
}
