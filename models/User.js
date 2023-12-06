const mongoose =  require('mongoose');

const userData =  new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
    }

},{
    timestamps:true
})

module.exports = mongoose.model('User', userData);