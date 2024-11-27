const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    history : {
        type : String
    },
    createdAt : {
        type  : Date
    }
})

module.exports = mongoose.model('User',User);