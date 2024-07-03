const Fuse = require('fuse.js');
const { blog } = require("../models/blog.schema")
const {user} = require("../models/user.schema")
const fuse = require("fuse.js")
// get

const home = (req,res)=>{
        res.render('home')
}

const getpost =(req,res)=>{
        res.render('addblog')
}

const getblog = async(req,res)=>{
    try {
        const data = await blog.find()
        res.send(data)
    } catch (error) {
        return res.send({error:error})
    }
}

const single = async(req,res)=>{
    try {
        const {id} = req.params

        const singleBlog = await blog.findById(id);
        console.log(singleBlog);
        res.render('singleBlogPage',{singleBlog})
    } catch (error) {
        return res.send({error:error})
    }
}

// post

const post = async(req,res)=>{
    try {
        const {title,content,image,category}=req.body

        const addblog = {
        title:title,
        content:content,
        image:image,
        author:req.cookies.author,
        category:category
        }
        const data = await blog.create(addblog)

        return res.cookie('blogId',data.id).send(`blog created by ${req.cookies.author}`)
    } catch (error) {
        return res.send({error:error})
    }
}

// delete

const dlt = async(req,res)=>{
    try {
        const {id} = req.params

        const data = await blog.findByIdAndDelete(id)
        if(data){
            const data = await blog.find()
            return res.send({blog:data})
        }
        else{
            return res.send({message:"blog is not available"})
        }

    } catch (error) {
        return res.send({error:error})
    }
}

// patch

const edit = async(req,res)=>{
    try {
        const {id} = req.params

        const data = await blog.findByIdAndUpdate( id,req.body)

        if(data){
        const data = await blog.find()
        return res.send({blog:data})
        }
        else{
            return res.send({message:"blog is not available"})
        }
    } catch (error) {
        return res.send({error:error})
    }
} 

// like

const like = async(req,res)=>{
    try {
        let {id} = req.cookies
        let blogid = req.params.id
        // console.log(id + "blogid");

        const username = await user.findById(id)
        const blogdata = await blog.findById(blogid)

        // console.log(blogdata + "blogdata");
        blogdata.likedBy.push( {username:username.username} )
        await blogdata.save()
        return res.send(blogdata)

    } catch (error) {
        res.send({error:error})
    }
}

// comment 

const comment = async(req,res)=>{
    try {
        let {id} = req.cookies
        let blogid = req.params.id
        
        // console.log(id +" comment");
        const name = await user.findById(id)
        const blogdata = await blog.findById(blogid)
        
        // console.log(blogdata +" comment");
        let result = {
            text:req.body.text,
            username:name.username
        }
        blogdata.comments.push(result)
        await blogdata.save()

        return res.send(blogdata)
    } catch (error) {
        res.send({error:error})
    }
}


// filter

const filter = async(req,res)=>{
    try {
        const {category} = req.query
    
        const data = await blog.find({category:category})
        
        return res.send(data)
    } catch (error) {
        return res.send({error:error.message})
    }
}

// search

const search = async(req,res)=>{
    try {
        const query = req.query.blogs;
        const blogs = await blog.find()

        const options = {
            keys:["author", "category", "title"]
        }

        const fuse = new Fuse(blogs,options);
        const result = fuse.search(query)
        console.log(result);
        return res.send(result)
        
    } catch (error) {
        return res.send({error:error})
    }
}



module.exports = {post,getpost,home,getblog,dlt, edit,single,filter,like,comment,search}