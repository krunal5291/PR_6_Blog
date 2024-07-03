const express = require('express')
const { connection } = require('./config/db')
const cookie = require('cookie-parser')
const { router } = require('./routes/user.route')
const { blog } = require('./routes/blog.route')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookie())

app.set('view engine','ejs') 
app.set('views',__dirname+'/views') 
app.use(express.static(__dirname + '/public')) 

app.use('/user',router)
app.use('/blog',blog)

app.get('/',(req,res)=>{
    res.send('Welcome to the movie API')
})
app.listen(8090,()=>{
    console.log('http://localhost:8090');
    connection()
})