const Vendor = require("../model/Vendor");
const jwt = require("jsonwebtoken")



exports.register = async function (req, res) {
    console.log("hit")
    console.log(req.body)
    let vendors = new Vendor(req.body)
    let result = await vendors.register()
    res.json(result)
}


exports.login = function (req, res) {
    console.log(req.body);
    let vendors = new Vendor(req.body);
    vendors
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

exports.getAllVendors = async function(req, res){
    let vendor = new Vendor()
    let allvendors = await vendor.getAllVendors()
    res.json(allvendors)
}

exports.getVendorById = async function(req, res){
    let vendor = new Vendor()
    let vendorDoc = await vendor.getVendorById(req.params.id) //somethinmg equivalent to req.parmas.id
    res.json(vendorDoc)
}