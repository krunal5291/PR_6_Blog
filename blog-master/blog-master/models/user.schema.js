const { default: mongoose } = require("mongoose");

const usersachema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    role: String,
})

const user = mongoose.model('user',usersachema)

module.exports = {user}