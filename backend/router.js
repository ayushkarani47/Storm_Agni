const express= require('express')
const router = express.Router()
let organisorController = require('./controller/organisorController')
const authMiddleware = require("./middleware/auth")
let chatController = require('./controller/chatController')
const eventController = require('./controller/eventController')
const bookingController = require('./controller/bookingController')
//login/registe related
router.post('/organisor/register', organisorController.register)
router.post('/organisor/login', organisorController.login)

//Event related
router.post('/host-event', authMiddleware.verifyToken, function(req, res){
    console.log(req.role)
    res.send('verified organiser')
} )
router.post('/register-for-event', authMiddleware.verifyToken, eventController.registerForEvent )
router.get('/get-todays-events', authMiddleware.verifyToken, eventController.getTodaysEvents)
//flutte API
router.post('/markPresent', authMiddleware.verifyToken, eventController.markPresent)
//Chat related
router.post('/send-chat', authMiddleware.verifyToken, chatController.sendChat)
router.get('/get-my-chat', authMiddleware.verifyToken, chatController.getChatConvo)

//booking
router.post('/getBookingByDate', authMiddleware.verifyToken, bookingController.getBookingByDate)
router.post('/addbooking', authMiddleware.verifyToken, bookingController.book )
//testing
router.get('/test', function(req, res){
   res.render('login-farmer')
})
module.exports=router