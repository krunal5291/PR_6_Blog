const {Router} = require('express')
const { signup, getsignup, getlogin, login } = require('../controllers/user.controller')
const router = Router()

router.get('/signup',getsignup)

router.get('/login',getlogin)

router.post('/signup',signup)

router.post('/login',login)

module.exports={router}