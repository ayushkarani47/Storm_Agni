const eventsCollection = require('../db').collection("Events");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
// const validator = require("validator")
// const md5 = require('md5')
let Event = function(data){
this.data = data
this.errors =[]
}


//For now on;ly dealing with company as a whole entity. (not sub agents)
Event.prototype.cleanUp =function(){
   this.data = {
   eventName: this.data.eventName,
   eventDescription: this.data.eventDescription,
   eventPoster: this.data.eventPoster, //pdf
   eventAttachment: this.data.eventAttachment,//pdf
   eventType:this.data.eventType,
   isPaid:this.data.isPaid,
   location:this.data.location,
   maxAttendees:this.data.maxAttendees,
   whatsAppLink: this.data.whatsAppLink,
   eventStartDate: new Date(this.data.startDate),
   eventStartTime: this.data.startTime,
   eventEndDate: new Date(this.data.endDate),
   eventEndTime: this.data.endTime,
   organisorDetails: this.data.organisorDetails,
   totalBudget: this.data.totalBudget,
   photoDriveLink: this.data.photoDriveLink,
   category: this.data.category, //category: amount
   registeredParticipants: [],
   presentParticipants: [],
   winners:[], //object o1: name, o1:number
   isCertified: this.data.isCertified,
   isWalkInallowed : this.data.isWalkInallowed,
   virtualCoins: this.data.vcirtualCoins,
   hostedBy: new ObjectId(this.data.hostedBy), //id of the person who clicks on raise event 
   addDate: new Date()
   }
   
}

Event.prototype.hostEvent= async function(){
this.cleanUp()
await eventsCollection.insertOne(this.data);
}

Event.prototype.registerForEvent = async function(participantId, eventId){
   try{
       console.log(participantId)
       console.log(eventId)
       await eventsCollection.findOneAndUpdate({_id: new ObjectID(eventId)}, {$push:{ "registeredParticipants":{participantId: new ObjectID(participantId), date: new Date()} }}) 

   } catch(e){
console.log(e)
   }
}

// Event.prototype.getPresentParticipants = async function(eventId){
//    let presentParticipants = await eventsCollection.find
//    }

   Event.prototype.markPresent = async function(eventId, participantId, adminId){
      return eventsCollection.findOneAndUpdate({_id: new ObjectID(eventId)}, {"$push":{"presentParticipants":{"participantId": new ObjectID(participantId), "markedPresentBy": new ObjectID(adminId), "date": new Date(), "certificateRecvd": false}}}, {new: true}).then(eventDoc=>{
          // console.log(eventDoc)
               return eventDoc;
           }).catch((e)=>{
             console.log(e);         
           })
         }

   Event.prototype.getTodaysEvents = async function(){
      let allEvent = await eventsCollection.find({}).toArray()
    let  todaysEvent = allEvent.filter((elem)=>{
    
        return  elem.eventStartDate.toDateString() == new Date().toDateString()
      })
    console.log(todaysEvent)
      return todaysEvent;
  }

// Event.prototype.getPresentParticipantsCertificate = async function(participantId){
//    console.log(participantId);
//    let data = await eventsCollection.countDocuments({presentParticipants: {
//      $elemMatch: {
//        "participantId": new ObjectID(participantId)
//      }
//    }})
//    console.log("Counttttttttttttttttttt");
//    console.log(data);
//    return data
//  }

Event.prototype.getRegisteredParticipants = async function(participantId){
   console.log(participantId);
   let data = await eventsCollection.countDocuments({registeredParticipants: {
     $elemMatch: {
       "participantId": new ObjectID(participantId)
     }
   }})
   console.log("Counttttttttttttttttttt");
   console.log(data);
   return data
 }

Event.prototype.getAllEvents = async function(){
   let events =  await eventsCollection.find({}).sort({eventStarteDate: 1 }).toArray()
   return events
   }
module.exports = Event
