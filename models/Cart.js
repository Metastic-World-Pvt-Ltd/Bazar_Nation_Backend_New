const mongoose =  require('mongoose');

const cartData =  new mongoose.Schema({
    itmeId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
    },
    productId:{
        type:String,
        required:true,
    },
    qty:{
        type:String,
        required:true,
    },


},{
    timestamps:true
})

module.exports = mongoose.model('Cart', cartData);