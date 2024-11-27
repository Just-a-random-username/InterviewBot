const express = require('express')
const connectmydb = require('./dbs/db')
const dotenv = require('dotenv')
const app = express()
const user = require('./routes/userroute')
const cookieParser = require('cookie-parser')
const {middleware} = require('./middleware/auth')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

dotenv.config();

connectmydb();

app.use('/api/v1',user)

app.get('/gg',middleware,(req,res)=>{
    res.send("done");
})

app.listen(3000,()=>{
    console.log("app is listening")
})