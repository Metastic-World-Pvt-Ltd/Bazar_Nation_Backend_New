const AdminUser = require('../../models/AdminUser');
const errorMessages = require('../../response/errorMessages');
require('dotenv').config({path:'../../.env'});
const jwt = require('jsonwebtoken');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.registerAdmin = async function(req , res){
    const { name , contact , email , password , role} = req.body;
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        logger.error(errorMessages.TOKEN_NOT_FOUND)
        return res.status(401).json(errorMessages.TOKEN_NOT_FOUND);
    }

    if(!name || ! contact || ! email || ! password || !role){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    const isExist =  await AdminUser.findOne({email});

    if(isExist){
        return res.status(422).json(errorMessages.EMAIL_ALLREADY_EXIST);
    }

    const count = await AdminUser.countDocuments();
    
    let formattedNumber;
    var counter = count + 1;
    if (counter < 10) {
        formattedNumber = counter.toString().padStart(4, '0');
    } else if (counter < 100) {
        formattedNumber = counter.toString().padStart(4, '0');
    }else if (counter < 1000) {
        formattedNumber = counter.toString().padStart(4, '0');
    }
     else {
        formattedNumber = counter.toString();
        
    }
    const otpInt = Math.floor(1000 + Math.random() *9000);
    const otp = otpInt.toString();
    console.log(otp);
    const userId = otp + formattedNumber;

    var userRole;
    var decode;
    try {
        //decode token signature
        const secret = process.env.SECRET_KEY;
        decode = jwt.verify(token , secret);
        
    //check for user role as per token
         userRole = decode.role;
    } catch (error) {
        logger.error(errorMessages.TOKEN_EXPIRED);
        return res.status(401).json(errorMessages.TOKEN_EXPIRED)
    }
    const _id = decode.id;
    const adminEmail = decode.email;
    // const adminEmail = 'anuj@metasticworld.com';
    const activeUser = await AdminUser.findById({_id})
    
    if(activeUser == null){
        logger.error(`In active Admin`)
        return res.status(401).json(errorMessages.ACCESS_DENIED)
    }
    if(userRole == "Super_Admin" || userRole == "super_admin"){
        const userData = new AdminUser({
            userId , name , contact , email , password , role , createdBy:adminEmail ,
        })
        await userData.save();
        return res.status(200).json(successMessages.USER_CREATED_SUCCESSFULLY);
    }else{
        return res.status(403).json(errorMessages.ACCESS_DENIED);
    }



}