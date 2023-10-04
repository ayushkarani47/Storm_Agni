const chatsCollection = require('../db').collection("chats");
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
// const validator = require("validator")
// const md5 = require('md5')
let Chat = function(data){
this.data = data
this.errors =[]
}

Chat.prototype.cleanUp = async function () {
    // Clean up the data as before
    this.data = {
        messageContent: this.data.messageContent,
        receiverId: new ObjectID(this.data.receiverId),
        senderId: new ObjectID(this.data.senderId),
        sentTime: new Date(),
    };
}

 Chat.prototype.sendChat = async function(){
    this.cleanUp()
    try {
        await chatsCollection.insertOne(this.data);
    } catch (error) {
        console.error("Error storing message in the database:", error);
    }
};

 Chat.prototype.getChatConvo = async function(requesterId, chatContactId){
    this.cleanUp()
    try {
      let chats =   await chatsCollection.find({
            $and: [
                {
                    $or: [
                        { senderId: new ObjectId(requesterId) },
                        { senderId: new ObjectId(chatContactId) }
                    ]
                },
                {
                    $or: [
                        { receiverId: new ObjectId(requesterId) },
                        { receiverId: new ObjectId(chatContactId)}
                    ]
                }
            ]
        }).toArray();
        return chats
    } catch (error) {
        console.error("Error storing message in the database:", error);
    }
};
 

module.exports = Chat