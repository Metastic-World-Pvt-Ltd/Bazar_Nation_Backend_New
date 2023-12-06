const mongoose =  require('mongoose');

const productData =  new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
    },
    stockCount:{
        type:Number,
        required:true
    },
    variantId:{
        type:String,
        required:true,
    },
    unit:{
        type:String,
        required:true,
    },
    unitValue:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    mrp:{
        type:Number,
        required:true,
    },
    costPrice:{
        type:Number,
        required:true,
    },
    brandName:{
        type:String,
        required:true,
    },
    listedBy:{
        type:String,
        required:true,
    },
    deletedBy:{
        type:String,   
    },
    updatedBy:{
        type:String,   
    },
    productImage:{
        type:String,   
    },

},{
    timestamps:true
})

module.exports = mongoose.model('Product', productData);