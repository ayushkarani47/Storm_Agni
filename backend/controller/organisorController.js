const Organisor = require("../model/Organisor");
const jwt = require("jsonwebtoken")



exports.register = async function (req, res) {
    console.log("hit")
    console.log(req.body)
    let organisor = new Organisor(req.body)
    let result = await organisor.register()
    res.json(result)
}


exports.login = function (req, res) {
    console.log(req.body);
    let organisor = new Organisor(req.body);
    organisor
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