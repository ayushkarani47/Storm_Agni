const Chat = require("../model/Chat");


exports.sendChat = async function(req, res){
try{
    let chat = new Chat(req.body);
    await chat.sendChat();
    res.json("sent")
} catch(e){
    console.log(e)
    res.json("failed")
}
}

exports.getAllChats = async function(req, res){
try{
    let chat = new Chat(req.body);
   let allChats = await chat.getAllChats();
    res.json(allChats)
} catch(e){
    console.log(e)
    res.json("failed")
}
}

// exports.getAllChats = async function(req, res){
// try{
//     let chat = new Chat(req.body);
//    let allChats = await chat.getAllChats();
//     res.json(allChats)
// } catch(e){
//     console.log(e)
//     res.json("failed")
// }
// }

exports.getChatConvo = async function(req, res){
    try{
    let chat = new Chat();
   let chats = await chat.getChatConvo(req.requesterId, req.chatContactId); //match both with senderId and recieverID
    res.json(chats)
} catch(e){
    console.log(e)
    res.json("failed")
}
}
