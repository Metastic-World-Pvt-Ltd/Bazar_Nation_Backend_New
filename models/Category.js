const mongoose =  require('mongoose');

const categoryData =  new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },



},{
    timestamps:true
})

module.exports = mongoose.model('Category', categoryData);