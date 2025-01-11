const express=require('express')
const router=express.Router()
const userController=require('../controllers/user.controller')
const verifyToken = require('../middlewares/userauth.middleware')
const authRoles = require('../middlewares/role.middleware')
const itemController=require('../controllers/item.controller')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/dashboard',verifyToken,authRoles('admin'),userController.dashboard)
router.post('/createItem',verifyToken,authRoles('admin'),itemController.createItem)
router.get('/itemList',verifyToken,authRoles('admin','bider'),itemController.itemList)
// router.get('/bidForm/:id',verifyToken,authRoles('bider'),itemController.bidForm)

module.exports=router