const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')



// router.get('/' , UserController.bhanu  )
router.get('/sum' ,  UserController.sum)
router.get('/register' ,  UserController.resgiter)
router.get('/message' ,  UserController.message)






module.exports = router