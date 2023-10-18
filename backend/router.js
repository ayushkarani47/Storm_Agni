const express= require('express')
const router = express.Router()
let organisorController = require('./controller/organisorController')
const authMiddleware = require("./middleware/auth")
let chatController = require('./controller/chatController')
const eventController = require('./controller/eventController')
const bookingController = require('./controller/bookingController')
const participantController = require('./controller/participantController')

router.get('/', organisorController.home)
//login/registe related
router.get('/login-page-organisor', function(req, res){res.render('login-organisor')})
router.post('/organisor/register', organisorController.register)
router.post('/organisor/login', organisorController.login)

//Event related
router.get('/host-event', function(req, res){res.render('add-event-page')})
router.post('/host-event', eventController.hostEvent )
router.post('/register-for-event', eventController.registerForEvent )
router.get('/get-todays-events', eventController.getTodaysEvents)
router.get('/eventList', eventController.getAllEvents)
router.get('/eventPage/:id', eventController.eventPageAdminView)
router.post('/register/:participantId/for/:eventId', eventController.registerForEvent)
//flutte API
router.post('/markPresent', eventController.markPresent)
//Chat related
router.post('/send-chat', chatController.sendChat)
router.get('/get-my-chat', chatController.getChatConvo)


//participant related
router.get('/login-participant', function(req, res){res.render('login-participant')})
router.post('/participant/login', participantController.login)
router.post('/participant/register', participantController.register)
//booking
router.post('/getBookingByDate', bookingController.getBookingByDate)
router.post('/addbooking', bookingController.book )
//testing
router.get('/test', function(req, res){
   res.render('login-organisor')
})

router.post('/logout', function(req, res){
   req.session.destroy(function(){
       res.redirect('/')
   })
 
})
module.exports=router