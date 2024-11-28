const jwt  = require('jsonwebtoken')
const User=  require('../models/user')

exports.middleware = async(req,res,next)=>{
    try {
        const token = req.cookies['token'];
        const decoded_data = jwt.verify(token,'lodekasignature')
        if(!decoded_data){
            throw("Unknown token")
        }
        User.findOne({email: decoded_data.email}).then(d=>{
            if(d){
               req.user = {user_id : decoded_data._id} 
            }else{
                throw("chal nikal")
            }
        })
        next();
    } catch (error) {
        res.status(200).send("error")
    }
}