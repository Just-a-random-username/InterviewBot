const mongoose = require('mongoose')

function connectmydb(){
    mongoose.connect('mongodb+srv://Abhiman:Abhishek03@cluster02.5spc1jm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster02/lordkaproject')
    .then(() => console.log('Connected!'));
}

module.exports = connectmydb