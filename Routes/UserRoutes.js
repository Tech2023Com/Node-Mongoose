const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')



// router.get('/' , UserController.bhanu  )
router.get('/sum' ,  UserController.sum)
router.get('/register' ,  UserController.resgiter)
router.post('/message' ,  UserController.message)
router.post('/login' ,  UserController.login)






module.exports = router