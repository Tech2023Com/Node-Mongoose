const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')



// router.get('/' , UserController.bhanu  )
router.get('/sum' ,  UserController.sum)
router.get('/register' ,  UserController.resgiter)
router.post('/message' ,  UserController.message)
router.post('/login' ,  UserController.login)
router.get('/get-all-users' ,  UserController.getAllUsers)
router.post('/edit-user' ,  UserController.editUser)
router.get('/del-user' ,  UserController.deleteUser)






module.exports = router