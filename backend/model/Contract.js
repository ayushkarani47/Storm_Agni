const contractsCollection = require('../db').collection("contracts");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
// const validator = require("validator")
// const md5 = require('md5')
let Contract = function(data){
this.data = data
this.errors =[]
}

Contract.prototype.cleanUp = async function () {
    // Clean up the data as before
    this.data = {
       vendorId : new ObjectId(this.data.vendorId),
       purchaserId: new ObjectId(this.data.purchaserId),
       vendorName: this.data.vendorName,
       purchaserName: this.data.purchaserName,
       totalCost: this.data.cost,
       items: this.data.items,
       contractDate: new Date()
    };
}


Contract.prototype.generateContract = async function(){
    this.cleanUp()
    await contractsCollection.insertOne(this.data)     
}

module.exports = Contract