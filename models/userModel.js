const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter a username"],
    },
    email: {
        type: String,
        required: [true, "please add the user email address"],
        unique: [true, "email address already exists"]
    },

    password: {
        type: String,
        requird: [true, "please enter a password"],
    },

}, {
    timetamps: true,
})

module.exports =mongoose.model('User',userSchema);