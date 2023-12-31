const participantsCollection = require('../db').collection("participants");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
// const validator = require("validator")
// const md5 = require('md5')
let Participant = function(data){
this.data = data
this.errors =[]
}


//For now on;ly dealing with company as a whole entity. (not sub agents)
Participant.prototype.cleanUp =function(){
   this.data = {
   participantName: this.data.participantName,
   participantEmail: this.data.participantEmail,
   participantContactNum: this.data.participantContactNum, //copy same thing as lhs after the .
   role: "participant",
   participantPassword:this.data.participantPassword,
 
   }
   
}

Participant.prototype.register = async function () {
    this.cleanUp()
    return new Promise(async (resolve, reject) => {
        // Step #1: Validate user data
        //   await this.validate()
        
        // Step #2: Only if there are no validation errors 
        // then save the user data into a database
        console.log("Helooooooooooooooooooooooooooooooooooooooooooooooo");
        console.log(this.data)
        this.cleanUp()
        console.log(this.data)
        if (!this.errors.length) {
          // hash user password
          let salt = bcrypt.genSaltSync(10)
          this.data.participantPassword = bcrypt.hashSync(this.data.participantPassword, salt)
          await participantsCollection.insertOne(this.data)
          resolve()
        } else {
          reject(this.errors)
        }
      })
}

Participant.prototype.login = async function () {
    try {
        console.log(this.data.participantEmail);
        this.cleanUp();
        const attemptedUser = await participantsCollection.findOne({ participantEmail: this.data.participantEmail });
        console.log("Found! based on email");
        console.log(attemptedUser);

        if (attemptedUser && bcrypt.compareSync(this.data.participantPassword, attemptedUser.participantPassword)) {
            this.data = attemptedUser;
            console.log("This data");
            console.log(this.data);
            return this.data;
        } else {
            console.log("Invalid");

            throw "Invalid username / password.";
        }
    } catch (error) {
        console.log("Failed");

        throw "Please try again later.";
    }
};

Participant.prototype.getAllParticipants = async function(){
    let allParticipants = await participantsCollection.find({}).toArray()
    return allParticipants;
}

Participant.prototype.getParticipantbyId = async function(participantId){
    let participantDoc = await participantsCollection.find({_id: new ObjectId(participantId)}).toArray()
    return participantDoc;
}


Participant.prototype.registerForEvent = async function(partId, eventId){
    await participantsCollection.findOneAndUpdate({_id: new ObjectId(partId)}, {"$push":{ "eventsRegisteredIn":{eventId: eventId, date: new Date()} }}) 

  }

  Participant.prototype.getRegisteredParticipants = async function(eventId){
    let registeredStudents =  await participantsCollection.find({eventsRegisteredIn:{ $elemMatch: { "eventId": eventId} }}).toArray()
    return registeredStudents
  }
  
module.exports = Participant
