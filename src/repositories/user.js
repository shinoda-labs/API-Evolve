'use stric'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.createUser = async (data) => {
    var user = new User(data)
    await user.save()
    return user._id
}

exports.getUserById = async (data) => {
    return await User
        .findOne({ _id: data },
            'email username name biography image')
}

exports.updateUser = async (id, data) => {
    return await User
        .findByIdAndUpdate(id, {
            $set: data
        })
}