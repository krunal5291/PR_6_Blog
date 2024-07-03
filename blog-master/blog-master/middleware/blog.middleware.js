const createauth = (req,res,next)=>{
    const {title,content,category,image,}= req.body

    if(title && content && category && image){
        next()
    }
    else{
        res.send('All fields are required')
    }
}

const roleauth = (req,res,next)=>{
    const {role} = req.cookies
    if(role == 'admin'){
        next()
    }
    else{
        res.send('You are not authorized to access this page.')
    }
}

const userauth = (req,res,next)=>{
    const {id} = req.cookies
    
    if(id){
        next()
    }
    else{
        res.send('login or signup first')
    }
}

module.exports = {createauth,roleauth,userauth}