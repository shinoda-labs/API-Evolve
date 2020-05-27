'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const authService = require('../services/authorize');

exports.authorize = async (data) => {
    return await User.findOne({
        username: data.username,
        password: data.password
    })
}