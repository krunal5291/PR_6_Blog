const {Router} = require('express')
const { post, getpost, home, getblog,   single, like, dlt, edit, filter, comment, search } = require('../controllers/blog.controller')
const { createauth, roleauth, userauth } = require('../middleware/blog.middleware')
const blog = Router()

blog.get('/',home)

blog.get('/blogs',getblog)

blog.get('/create',roleauth,getpost)

blog.get('/singleBlog/:id',single)

blog.get("/filter",filter)

blog.get("/search",search)

blog.post('/create',createauth,post)

blog.patch('/edit/:id',edit)

blog.patch('/like/:id',userauth,like)

blog.patch('/comment/:id',userauth,comment)

blog.delete('/delete/:id',roleauth,dlt)

module.exports= {blog}