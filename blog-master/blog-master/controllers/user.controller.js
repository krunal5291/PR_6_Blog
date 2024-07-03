
const { user } = require("../models/user.schema")

const getsignup = (req,res)=>{
    res.render('signup')
}

const getlogin = (req,res)=>{
    res.render('login')
}

const signup = async(req,res)=>{
   
    try {
        let data = await user.findOne({email : req.body.email})
        if(!data){ 
            const data = await user.create(req.body)
            return res.cookie('role',data.role).cookie('id',data.id).cookie('author',data.username).cookie('username',data.username).send({username:data.username})
        }
        else{
            return res.cookie('role',data.role).cookie('author',data.username).cookie('id',data.id).cookie('username',data.username).send(`Account created successfully ${data.username}`)
        }
    } catch (error) {
        res.send(error.message)
    }
}

const login = async(req,res)=>{
    try {
        let data = await user.findOne({email : req.body.email})
        if(!data){
            return res.send('Invalid Credentials.')
        }
        if(data.password != req.body.password){
            return res.send('Invalid Credentials.')
        }
        else{
            return res.cookie('id',data.id).cookie('role',data.role).cookie('author',data.username).cookie('username',data.username).send(`<h1 style="font-family: sans-serif;">Welcome User ${data.username}</h1>`)
        }
    } catch (error) {
        if(error){
            res.send(error)
        }
    }
}

module.exports = {signup,getsignup,getlogin,login}


