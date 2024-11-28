const mongoose =  require('mongoose')
// const user = require('./user')

const Userskill = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    skills : Array,
    
})