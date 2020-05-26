'use stric'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.post = async (data) => {
    var user = new User(data)
    await user.save()
    return user._id
}

exports.getById = async (data) => {
    return await User
        .findOne({ _id: data },
            'email username')
}