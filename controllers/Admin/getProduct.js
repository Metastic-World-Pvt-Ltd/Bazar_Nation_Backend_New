const Product = require('../../models/Product');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.getProduct = async function(req , res){

    const productId =  req.params.id;
    
    if(!productId){
        return res.status(400).json('Product Id is required');
    }

    const data = await Product.findOne({productId});

    console.log(data);

    res.json(data)
}