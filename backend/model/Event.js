const eventsCollection = require('../db').collection("Events");
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
    eventPoster: this.data.eventPoster,
    eventLikeCount: 0,
    eventStartDate: new Date(this.data.startDate),
    eventStartTime: this.data.startTime,
    eventEndDate: new Date(this.data.endDate),
    eventEndTime: this.data.endTime,
    eventAttachment: this.data.eventAttachment,
    contactName1 : this.data.contact1,
    contact1 : this.data.contactNo1,
    contactName2 : this.data.contact2,
    contact2 : this.data.contactNo2,
    workSubmissionMail: this.data.email,
    whatsAppLink: this.data.whatsAppLink,
    isCertificate: Boolean(this.data.isCertificate),
    // eventCriteria: this.data.criteria, //(takes year 1/2/3)
    isWalkIn: Boolean(this.data.isWalkIn),
    registeredParticipants: [],
    presentParticipants: [],
    winners:[],
    virtualCoins: Number(this.data.virtualCoins),
    createdBy: this.data.hostedBy, //(admin id)
    createdDate: new Date()
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
       await eventsCollection.findOneAndUpdate({_id: new ObjectId(eventId)}, {$push:{ "registeredParticipants":{participantId: new ObjectId(participantId), date: new Date()} }}) 

   } catch(e){
console.log(e)
   }
}

// Event.prototype.getPresentParticipants = async function(eventId){
//    let presentParticipants = await eventsCollection.find
//    }

   Event.prototype.markPresent = async function(eventId, participantId, adminId){
      return eventsCollection.findOneAndUpdate({_id: new ObjectId(eventId)}, {"$push":{"presentParticipants":{"participantId": new ObjectId(participantId), "markedPresentBy": new ObjectId(adminId), "date": new Date(), "certificateRecvd": false}}}, {new: true}).then(eventDoc=>{
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
//        "participantId": new ObjectId(participantId)
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
       "participantId": new ObjectId(participantId)
     }
   }})
   console.log("Counttttttttttttttttttt");
   console.log(data);
   return data
 }

Event.prototype.getAllEvents = async function(){
   let events =  await eventsCollection.find({}).sort({eventStarteDate: 1 }).toArray()
   console.log(events)
   return events
   }


   
Event.prototype.getEventById = async function(eventId){
  let eventDoc = await eventsCollection.findOne({_id: new ObjectId(eventId)})
  return eventDoc
}
module.exports = Event
