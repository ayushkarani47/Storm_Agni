const organisorsCollection = require('../db').collection("Organisors");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
// const validator = require("validator")
// const md5 = require('md5')
let Organisor = function(data){
this.data = data
this.errors =[]
}


//For now on;ly dealing with company as a whole entity. (not sub agents)
Organisor.prototype.cleanUp =function(){
   this.data = {
   orgName: this.data.orgName,
   orgEmail: this.data.orgEmail,
   orgContactNum: this.data.orgContactNum, //copy same thing as lhs after the .
   certificates:this.data.certificates ,
   noOfEventsOrganised: this.data.noOfEventsOrganised,
   portfolio: this.data.portfolio,//pdf,
   socialMediaLinks:this.data.socialMediaLinks ,
   wbsiteLink:this.data.wbsiteLink ,
   expertise: this.data.expertise,
   bio:this.data.bio,
   role: "organisor",
   reputation: 0, //based on feedback;
   orgPassword:this.data.orgPassword
   }
   
}

Organisor.prototype.register = async function () {
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
          this.data.orgPassword = bcrypt.hashSync(this.data.orgPassword, salt)
          await organisorsCollection.insertOne(this.data)
          resolve()
        } else {
          reject(this.errors)
        }
      })
}

Organisor.prototype.login = async function () {
    try {
        console.log(this.data.orgEmail);
        this.cleanUp();
        const attemptedUser = await organisorsCollection.findOne({ orgEmail: this.data.orgEmail });
        console.log("Found! based on email");
        console.log(attemptedUser);

        if (attemptedUser && bcrypt.compareSync(this.data.orgPassword, attemptedUser.orgPassword)) {
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


module.exports = Organisor
