const Product = require('../../models/Product');

module.exports.getProductByCategory = async function(req, res){
    const subCategory = req.headers['sub-category'];

    if(!subCategory){
        return res.status(400).json('All Fields Required')
    }
    
    const productData =  await Product.find({subCategory});
    if(productData.length != 0){
        return res.status(200).json({'status':true , productData})
    }else{
        return res.status(404).json({'status':false , productData:'No Data Found'})
    }

    


}