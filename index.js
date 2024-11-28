const express = require('express')
const connectmydb = require('./dbs/db')
const dotenv = require('dotenv')
const app = express()
const user = require('./routes/userroute')
const fileUpload = require('express-fileupload');
const fileRoute = require('./routes/filehandle.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { middleware } = require('./middleware/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(

))
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
  

dotenv.config();

connectmydb();

app.use('/api/v1', user)
app.use('/api/v1', fileRoute)

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: false,
    createParentPath: true
}));

app.get('/gg', middleware, (req, res) => {
    res.send("done");
})

app.listen(3000, () => {
    console.log("app is listening")
})