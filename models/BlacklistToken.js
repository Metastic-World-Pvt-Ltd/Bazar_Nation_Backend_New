const mongoose =  require('mongoose');

const tokenData =  new mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },

},{
    timestamps:true
})


module.exports = mongoose.model('BlacklistToken', tokenData);