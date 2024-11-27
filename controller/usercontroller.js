const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 5

exports.register = async (req,res,next)=>{
    try{
        const {name, password} = req.body;
        const user = await User.findOne({name : name})
        if(!user){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            let hashed_password = await bcrypt.hash(password, saltRounds);
            // bcrypt.hash(password, saltRounds, (err, hash) {
                let new_user = new User({
                    name : name,
                    password : hashed_password,
                    history : "",
                    createdAt : today
                })
            // });       
            await new_user.save();
            res.status(200).send({user : new_user })
        }else{
            throw("already exists")
        }
    }catch(err){
        res.status(400).send({message : err})
    }
}