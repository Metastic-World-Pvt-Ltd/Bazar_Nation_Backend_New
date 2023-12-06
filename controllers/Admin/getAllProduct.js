const Product = require('../../models/Product');

module.exports.getAllProduct = async function(req , res){
    const data = await Product.find();
    console.log(data);
    if(data){
        return res.status(200).json(data);
    }else{
        return res.status(404).json(`No Record Available`)
    }
}