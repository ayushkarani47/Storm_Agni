
const Event = require('../model/Event')
const Participant = require('../model/Participant')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const { ObjectID } = require('mongodb')
const { default: axios } = require('axios')

exports.hostEvent = async function(req, res){
    let multipleNames =[]
    if(req.files){
      if(req.files.eventAttachment){
         console.log(req.files)
         if(Array.isArray(req.files.eventAttachment)){
             let files = req.files.eventAttachment
             // console.log(files);
             const promises = files.map((file)=>{
                 const fileName = new Date().getTime().toString() + "-" + file.name
                 const savePath = path.join(__dirname ,'../public/' , 'eventAttachments', fileName)
                 multipleNames.push(fileName)
                return file.mv(savePath)
             
             })
             await Promise.all(promises)
             req.body.eventAttachment = multipleNames
         }else if(!Array.isArray(req.files)){
             let file = req.files.eventAttachment
             const fileName = new Date().getTime().toString() + "-" + file.name
             const savePath = path.join(__dirname ,'../public/' , 'eventAttachments', fileName)
             await file.mv(savePath)
             req.body.eventAttachment = fileName
         }
      }
  
      if(req.files.eventPoster){
          const poster = req.files.eventPoster
          // console.log(logoFile.name);
          const fileName1 = new Date().getTime().toString() + "-" + poster.name
          const savePath1 = path.join(__dirname ,'../public/' , 'poster', fileName1)
          await poster.mv(savePath1)
          req.body.eventPoster = fileName1
      } 
    }
    let event = new Event(req.body)
    console.log(req.body)
    await  event.hostEvent()
    req.flash("success", "Event Added Successfully.")
    req.session.save(function() {
      res.redirect('/eventList')
    })
}


exports.getAllEvents = async function(req, res){
    let event = new Event()
  let events =  await event.getAllEvents()
    res.render('eventListAdmin',{
      events: events
    })
}


exports.registerForEvent = async function(req, res){
    console.log(req.params.participantId)
    console.log(req.params.eventId)
    let event = new Event()
    await event.registerForEvent(req.params.participantId,req.params.eventId)
    let participant = new Participant()
    await participant.registerForEvent(req.params.participantId,req.params.eventId)
    await axios.post('/https://salesbrahma.com/regsiteredForEvent',{
      eventName: "Buisness Bliss",
      contactNum: "0=9930990504"
    })
    req.flash("success", "Registered Successfully.")
    req.session.save(function() {
      res.redirect('/')
    })
}   

exports.eventPageAdminView = async function(req, res){
  let event = new Event()
  let eventDoc = await event.getEventById(req.params.id)
  
  let participant = new Participant()
  
  // for(let x of eventDoc.registeredParticipants){
  //   let studDoc =  await student.getStudentById(x.studId)
  // arr.push(studDoc)
  // console.log(arr)
  // }
  
  let registeredParticipants = await participant.getRegisteredParticipants(req.params.id)
  
  res.render('event-profile', {
    event : eventDoc,
    participants: registeredParticipants
  
  })
  }
exports.markPresent = async function(req, res){
    console.log("hit")
    console.log(req.body.eventId) 
    console.log(req.body.participantId)
    let event = new Event()
  
    let eventOldDoc = await event.getEventById(req.body.eventId)
    console.log(eventOldDoc)
    
    if(eventOldDoc.registeredParticipants.find((partic)=>partic.participantId == req.body.participantId)){
      console.log("In first if")
      if(!eventOldDoc.presentParticipants.find((partic)=>partic.participantId.equals(new ObjectID(req.body.participantId)))){
      console.log("In second if")
  
        let eventDoc = await  event.markPresent(req.body.eventId,req.body.participantId)
        let participant = new Participant()
        // console.log(eventDoc.value.vpCoins)
        console.log("Marked present")
        await participant.updateCoins(req.body.participantId, eventDoc.value.vpCoins )
        res.json("success")
      } else{
        console.log("Already present")
  
        res.json("alreadyPresent")
      }
  
    } else{
      console.log("Not Registerd")
      res.json("notRegistered")
    }
  
  }
  
  //Api for flutter App
exports.getTodaysEvents = async function(req, res){
    let event = new Event()
  let todaysEvents = await event.getTodaysEvents()
  res.json(todaysEvents)
  }