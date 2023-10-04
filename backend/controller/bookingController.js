const Booking = require("../model/Booking")
exports.getAllBookings = async function(req, res){
    let booking = new Booking()
    let allAppointments = await booking.getAllBookings();
    res.json(allAppointments)
    }
    
    
    exports.getBookingByDate = async function(req, res){
        console.log("Hittttt")
        let booking = new Booking()
     let bookingByDate = await  booking.getBookingByDate(req.body.date)
    let flag = 0
     for(i=0; i< bookingByDate.length; i++){
    
    // console.log(bookingByDate[i].startDate.getTime())
    
    
        if(bookingByDate[i].endDate.getTime() > new Date(req.body.date.startDate).getTime()){
           if(      bookingByDate[i].startDate.getTime() > new Date(req.body.date.startDate).getTime()  ){
    
            if(bookingByDate[i].startDate.getTime() > new Date(req.body.date.endDate).getTime()){
                console.log("free1")
                flag=1
                res.send("free")
                break;
            } else{
                flag=1
    
            console.log("booked1")
            console.log("")
            console.log("You have : " + bookingByDate[i].title + "from: " +  bookingByDate[i].startDate + "-" + bookingByDate[i].endDate)
            res.send("booked")
            break;
            }
           
           } else{
            flag=1
    
            console.log("booked2")
            console.log("You have : " + bookingByDate[i].title + "from: " +  bookingByDate[i].startDate + "-" + bookingByDate[i].endDate)
    
            res.send("booked")
            break;
           }
        }
    
     }
    
     if(flag ==0){
        console.log("free2")
        res.send("free")
     }
    }

    exports.book = async function(){
        let booking = new Booking()
        await booking.book()
        res.json("done")
    }