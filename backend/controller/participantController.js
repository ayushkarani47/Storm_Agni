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
    console.log(req.body);
    let participants = new Participant(req.body);
    participants
        .login()
        .then(function (result) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                role: result.role,
                id: result._id,
            };

            const token = jwt.sign(data, jwtSecretKey);

            res.json({ token: token, role: result.role, id: result._id.toString() });
        })
        .catch(function (e) {
            console.log(e);
        });
};

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