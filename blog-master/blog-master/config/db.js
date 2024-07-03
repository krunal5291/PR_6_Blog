const { default: mongoose } = require("mongoose");
require('dotenv').config()
const connection = ()=>{
    mongoose.connect(process.env.db_url)
    console.log('db connected');
}

module.exports={connection}