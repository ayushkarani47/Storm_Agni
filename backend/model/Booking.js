const bookingsCollection = require('../db').collection("bookings");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
// const validator = require("validator")
// const md5 = require('md5')
let Booking = function(data){
this.data = data
this.errors =[]
}


Booking.prototype.book = async function () {
    this.cleanUp()
   
    console.log("this.dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(this.data);
    let data =  await bookingsCollection.insertOne(this.data);
    return data.insertedId
   
}


Booking.prototype.cleanUp = async function () {
    // Clean up the data as before
    this.data = {
        title: this.data.clientName,
        // title: "HelloHI",
        startDate:new Date(this.data.startDate),
        endDate: new Date(this.data.endDate),
        // startTime:this.data.startTime,
        // endTime: this.data.endTime,
        clientfName: this.data.clientfName,
        clientlName: this.data.clientlName,
        mobile: this.data.mobile.trim(),
        contactId: new ObjectID(this.data.contactId), //new ObjectId
        // status: "tentative", //confirmed // cancelled //honoured
        // statusDetails : {
        //     cancelledBy: "",
        //     reason:""
        // },
        addDate: new Date()
    };
}





Booking.prototype.getAllBookingss = async function(){
    // let allBookings = await bookingsCollection.find({status:{$ne:"cancelled"}}).toArray()
    let allBookings = await bookingsCollection.find().toArray()
    console.log(allBookings)
    return allBookings
}

Booking.prototype.getBookingsByDate = async function(date){
    //     var today = moment();
    // var tomorrow = moment(today).add(1, 'days');
    console.log(date)
    
    let requestedDate = new Date(date.startDate);
    requestedDate.setHours(0,0,0,0);
    console.log("Requested Date: " + requestedDate)
    
    let nextDate = new Date(date.endDate);
    nextDate.setHours(0,0,0,0);
    console.log("OG Date: "  + nextDate)
    
    nextDate.setTime(nextDate.getTime() + (24*60*60*1000))
    
     console.log("next Date" + nextDate)
    
    
    let bookingsByDate = await bookingsCollection.find({
        "startDate" : {"$gte": requestedDate,
                  "$lt": nextDate }
      }).toArray()
    
    
    
    // find({startDate: new Date(date)}).toArray()
    console.log(bookingsByDate)
    return bookingsByDate
    }
module.exports = Booking