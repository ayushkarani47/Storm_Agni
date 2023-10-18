const Organisor = require("../model/Organisor");
const jwt = require("jsonwebtoken");
const Participant = require("../model/Participant");
const Event = require("../model/Event");
const moment = require('moment')


exports.home = async function(req, res){
    if (req.session.user) {
      if(req.session.user.role=="organisor"){
        // let rentItem = new RentItem()
    //    let rentItems = await rentItem.getOtherRentItems(req.session.user._id)
       res.render('calender')
      } else if (req.session.user.role =="pa"){
        res.send("Platform Admint DB")
      } else if(req.session.user.role == "client"){
        res.send("Client DB")

      } else if(req.session.user.role == "participant"){
        let event = new Event()
      let participant = new Participant()
      let events = await event.getAllEvents()
      let participantDoc = await participant.getParticipantbyId(req.session.user._id)
    //   let countCertificate = await event.getPresentParticipantsCertificate(req.session.user._id);
      let registeredParticipants = await event.getRegisteredParticipants(req.session.user._id);
    //   let totalEvents = await event.getTotalEventsCount();
      // console.log(events)
      res.render('attendee-dashboard', {
        events: events,
        participant: participantDoc,
        // countCertificate: countCertificate,
        registeredParticipants: registeredParticipants,
        // totalEvents:totalEvents,
        moment
      })
        // res.send("idk")
      }
      } else {
        res.render('lock-screen')
      }
}


exports.register = async function (req, res) {
    console.log("hit")
    console.log(req.body)
    let organisor = new Organisor(req.body)
    let result = await organisor.register()
    res.json(result)
}


exports.login = function (req, res) {
    console.log(req.body)
    let organisor = new Organisor(req.body)
    organisor.login().then(function (result) {
        req.session.user = { orgName: organisor.data.orgName,  orgEmail: organisor.data.orgEmail, _id: organisor.data._id, role:organisor.data.role}
        console.log("here")
        req.session.save(function () {
        res.redirect('/')
        })
    }).catch(function (e) {
        console.log(e);
        // req.flash('errors', e)
        // req.session.save(function () {
        res.redirect('/')
        // })
    })
}




// exports.login = function (req, res) {
//     console.log(req.body);
//     let organisor = new Organisor(req.body);
//     organisor
//         .login()
//         .then(function (result) {
//             let jwtSecretKey = process.env.JWT_SECRET_KEY;
//             let data = {
//                 role: result.role,
//                 id: result._id,
//             };

//             const token = jwt.sign(data, jwtSecretKey);

//             res.json({ token: token, role: result.role, id: result._id.toString() });
//         })
//         .catch(function (e) {
//             console.log(e);
//         });
// };

exports.getAllOrganisors = async function(req, res){
    let organisor = new Organisor()
    let allOrganisors = await organisor.getAllOrganisors()
    res.json(allOrganisors)
}

exports.getOrganisorById = async function(req, res){
    let organisor = new Organisor()
    let organisorDoc = await organisor.getOrganisorById(req.params.id) //somethinmg equivalent to req.parmas.id
    res.json(organisorDoc)
}