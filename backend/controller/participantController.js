const Participant = require("../model/Participant");
const jwt = require("jsonwebtoken")



exports.register = async function (req, res) {
    console.log("hit")
    console.log(req.body)
    let participants = new Participant(req.body)
    let result = await participants.register()
    res.json(result)
}



exports.login = function (req, res) {
    console.log(req.body)
    let participant = new Participant(req.body)
    participant.login().then(function (result) {
        req.session.user = { participantName: participant.data.orgName,  participantEmail: participant.data.participantEmail, _id: participant.data._id, role:participant.data.role}
        console.log("here")
        req.session.save(function () {
        res.redirect('/')
        })
    }).catch(function (e) {
        console.log(e);
        // req.flash('errors', e)
        // req.session.save(function () {
        res.redirect('/')
        // })
    })
}


// exports.login = function (req, res) {
//     console.log(req.body);
//     let participants = new Participant(req.body);
//     participants
//         .login()
//         .then(function (result) {
//             let jwtSecretKey = process.env.JWT_SECRET_KEY;
//             let data = {
//                 role: result.role,
//                 id: result._id,
//             };

//             const token = jwt.sign(data, jwtSecretKey);

//             res.json({ token: token, role: result.role, id: result._id.toString() });
//         })
//         .catch(function (e) {
//             console.log(e);
//         });
// };

exports.getAllParticipants = async function(req, res){
    let participant = new Participant()
    let allparticipants = await participant.getAllParticipants()
    res.json(allparticipants)
}

exports.getParticipantsById = async function(req, res){
    let participant = new Participant()
    let participantDoc = await participant.getParticipantsById(req.params.id) //somethinmg equivalent to req.parmas.id
    res.json(participantDoc)
}