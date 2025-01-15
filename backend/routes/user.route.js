const express=require('express')
const router=express.Router()
const userController=require('../controllers/user.controller')
const verifyToken = require('../middlewares/userauth.middleware')
const authRoles = require('../middlewares/role.middleware')
const paginate=require('../middlewares/paginate.middleware')
const itemController=require('../controllers/item.controller')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/dashboard',verifyToken,authRoles('admin'),userController.dashboard)
router.post('/createItem',verifyToken,authRoles('admin'),itemController.createItem)
router.get('/itemList',paginate,itemController.itemList)
router.get('/getTodayBids',verifyToken,authRoles('admin'),itemController.getTodayBids)
router.get('/getTotalBids',verifyToken,authRoles('admin'),itemController.getTotalBids)

module.exports=router