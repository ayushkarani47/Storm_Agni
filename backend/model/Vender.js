const venderCollection = require('../db').collection("Vender");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
// const validator = require("validator")
// const md5 = require('md5')
let Vender = function(data){
this.data = data
this.errors =[]
}


//For now on;ly dealing with company as a whole entity. (not sub agents)
Vender.prototype.cleanUp =function(){
   this.data = {
   venName: this.data.venName,
   venEmail: this.data.venEmail,
   venContactNum: this.data.venContactNum, //copy same thing as lhs after the .
   certificates:this.data.certificates ,
   noOfEventsVendered: this.data.noOfEventsVendered,
   portfolio: this.data.portfolio,//pdf,
   socialMediaLinks:this.data.socialMediaLinks ,
   wbsiteLink:this.data.wbsiteLink ,
   expertise: this.data.expertise,
   foodType: this.data.foodType,
   venPricing:this.data.venPricing,
   bio:this.data.bio,
   role: "Vender",
   reputation: 0, //based on feedback;
   venPassword:this.data.venPassword
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
          this.data.orgPassword = bcrypt.hashSync(this.data.venPassword, salt)
          await organisorsCollection.insertOne(this.data)
          resolve()
        } else {
          reject(this.errors)
        }
      })
}

Vender.prototype.login = async function () {
    try {
        console.log(this.data.venEmail);
        this.cleanUp();
        const attemptedUser = await organisorsCollection.findOne({ venEmail: this.data.venEmail });
        console.log("Found! based on email");
        console.log(attemptedUser);

        if (attemptedUser && bcrypt.compareSync(this.data.venPassword, attemptedUser.venPassword)) {
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


module.exports = Vender
