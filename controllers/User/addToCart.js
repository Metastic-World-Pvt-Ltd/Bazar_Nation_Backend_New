const Cart = require('../../models/Cart');
const uuid = require('uuid');
const errorMessages = require('../../response/errorMessages');

module.exports.addToCart = async function(req , res){
    const {userId , productId , qty} =  req.body;

    if(!userId || !productId){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    
    const itmeId = Date.now();

    const data = await Cart.create({
        itmeId , userId , productId , qty
    })

    console.log(data);

    res.status(200).json(data);

}