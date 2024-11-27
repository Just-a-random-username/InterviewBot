const express = require('express')
const connectmydb = require('./dbs/db')
const bodyparser =  require('body-parser')
const dotenv = require('dotenv')
const app = express()
const user = require('./routes/userroute')

// app.use(bodyparser.urlencoded({extended : true}))
app.use(bodyparser.json())
dotenv.config();

connectmydb();

app.use('/api/v1',user)

app.listen(3000,()=>{
    console.log("app is listening")
})