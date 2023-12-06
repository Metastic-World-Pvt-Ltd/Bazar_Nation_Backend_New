const Product = require('../../models/Product');

module.exports.deleteProduct = async function(req, res){
    const id = req.params.id;
    console.log(id);

    const data = await Product.findOneAndDelete({productId:id});

    console.log(data);

    res.json('ok')
}