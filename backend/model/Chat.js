const ChatCollection = require('../db').collection("Chat");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
// const validator = require("validator")
// const md5 = require('md5')
let Chat = function(data){
this.data = data
this.errors =[]
}

Chat.prototype.cleanUp = async function () {
    // Clean up the data as before
    this.data = {
        sentTime: this.data.sentTime,
        content: this.data.content,
        receiverId: this.data.receiverId,
        senderId: this.data.senderId,
    };

    try {
        // Insert the cleaned-up message into the database
        const result = await ChatCollection.insertOne(this.data);

        if (result.insertedCount === 1) {
            console.log("Message successfully stored in the database.");
        } else {
            console.error("Message insertion failed.");
        }
    } catch (error) {
        console.error("Error storing message in the database:", error);
    }
};
 