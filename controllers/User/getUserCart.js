const Cart = require('../../models/Cart');
const errorMessages = require('../../response/errorMessages');

module.exports.getUserCart = async function(req , res){
    const userId = req.headers['id'];

    if(!userId){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    const data = await Cart.find({userId});

    // console.log("Data",data);
    
    res.status(200).json({'cart':data[0]});
}