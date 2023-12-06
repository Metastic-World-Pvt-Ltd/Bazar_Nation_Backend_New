const mongoose =  require('mongoose');

const subCategoryData =  new mongoose.Schema({
    id:{
        type:String,
    },
    category:{
        type:String,
        required:true,
    },
    name:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },



},{
    timestamps:true
})

module.exports = mongoose.model('Subcategory', subCategoryData);