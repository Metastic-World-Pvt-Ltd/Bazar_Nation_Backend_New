const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const uuid = require('uuid');
const errorMessages = require('../../response/errorMessages');

module.exports.addToCart = async function(req , res){
try {
    const {userId , productId , qty , bill} =  req.body;

    if(!userId || !productId){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    const productData =  await Product.findOne({productId});
    //console.log(productData);
    const itmeId = Date.now();
    const items = {
        itemId: {
            productId:productData.productId,
            name: productData.name,
            productImage: productData.productImage,
            description: productData.description,
            brandName: productData.brandName,
            price: productData.price,
            mrp: productData.mrp,
            subCategory: productData.subCategory,
            category: productData.category,

        },
        qty: qty,
    
      }
    const isExist = await Cart.findOne({userId});
    if(isExist){
       const data = await Cart.findOneAndUpdate({userId},{
        $push: { items: items } , bill:bill
    },{new:true})
    res.status(200).json(data); 
    }else{
        const data = await Cart.create({
            userId , bill , items
       })
       res.status(200).json(data);
    }
} catch (error) {
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}


    

}