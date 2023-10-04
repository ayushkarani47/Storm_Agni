const Contract = require("../model/Contract");


exports.generateContract = async function(req, res){
try{
    let contract = new Contract(req.body);
    await contract.generateContract();
    res.json("added")
} catch(e){
    console.log(e)
    res.json("failed")
}
}