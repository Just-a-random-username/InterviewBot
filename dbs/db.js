const mongoose = require('mongoose')

function connectmydb(){
    mongoose.connect('mongodb://localhost:27017/lordkaproject')
    .then(() => console.log('Connected!'));
}

module.exports = connectmydb