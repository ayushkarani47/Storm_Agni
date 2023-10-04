const eventsCollection = require('../db').collection("Events");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
// const validator = require("validator")
// const md5 = require('md5')
let Event = function(data){
this.data = data
this.errors =[]
}


//For now on;ly dealing with company as a whole entity. (not sub agents)
Event.prototype.cleanUp =function(){
   this.data = {
   
   
   role: "organisor",
   eventType:this.data.eventType,
   ifPaid:this.data.ifPaid,
   location:this.data.location,
   numberOfAttendees:this.data.numberOfAttendees,
   
   }
   
}


module.exports = Event
