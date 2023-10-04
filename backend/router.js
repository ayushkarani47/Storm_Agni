const express= require('express')
const router = express.Router()
let organisorController = require('./controller/organisorController')
const authMiddleware = require("./middleware/auth")


router.post('/organisor/register', organisorController.register)
router.post('/organisor/login', organisorController.login)

router.get('/host-event', authMiddleware.verifyToken, function(req, res){
    console.log(req.role)
    res.send('verified organ')
} )

module.exports=router