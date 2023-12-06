const mongoose =  require('mongoose');
const bcrypt = require('bcryptjs')

const vendorSchema =  new mongoose.Schema({
    vendorId:{
        type:String,
        required:true
    },
    vendorName:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    storeName:{
        type:String,
        required:true,
    },
    productType:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    updatedBy:{
        type:String,
    },
    deletedBy:{
        type:String,
    },

},{
    timestamps:true
})

//hash password
vendorSchema.pre('save', async function(next){
    // console.log('inside Hash password')
     try {
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(this.password , salt);
         this.password = hashPassword;
         //console.log(this.password);
     } catch (error) {
         next(error);
     }
 })

module.exports = mongoose.model('Vendor', vendorSchema);