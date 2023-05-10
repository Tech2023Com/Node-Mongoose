const express = require('express')
const router = express.Router()
const AdminController = require('../Controllers/AdminController')



router.get('/admin-info' , AdminController.getAdminInfo )
router.get('/get-form' ,  AdminController.getForm)
router.get('/result' ,  AdminController.checkArmstong)




module.exports = router