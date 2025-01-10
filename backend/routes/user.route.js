const express=require('express')
const router=express.Router()
const userController=require('../controllers/user.controller')
const verifyToken = require('../middlewares/userauth.middleware')
const authRoles = require('../middlewares/role.middleware')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/dashboard',verifyToken,authRoles('admin'),userController.dashboard)

module.exports=router