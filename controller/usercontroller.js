const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt=  require('jsonwebtoken')
const saltRounds = 5

exports.register = async (req,res)=>{
    try{
        const {email,name, password} = req.body;
        
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
                    email : email,
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


exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        console.log(req.body)

        //check for email if exists

        let user = await User.findOne({email : email});
        
        if(!user){
            throw("Does not exists")
        }
        // it exists
        const issame = await bcrypt.compare(password, user.password);
        if(!issame){
            throw("Password error")
        }
        const token = jwt.sign({user},'lodekasignature')
        res.status(200).cookie('token',token, { maxAge: 36000, httpOnly: true }).json({userdetial : {
           email : user.email ,
           name : user.name
        }})

    }catch(err){
        res.status(400).json({message : err})
    }
}

