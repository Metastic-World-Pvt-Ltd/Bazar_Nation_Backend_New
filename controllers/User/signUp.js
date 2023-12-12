const User = require('../../models/User');
const errorMessages = require('../../response/errorMessages');
const jwt = require('jsonwebtoken');
const logger = require('../Logger/logger');
const successMessages = require('../../response/successMessages');
require('dotenv').config({path:'../../.env'});
const uuid = require('uuid');
const OTP = require('../../models/OTP');

module.exports.signUp = async function(req, res){
try {
    logger.info(`Start`);
    logger.info(successMessages.USER_SIGN_UP_ACTIVATED)
    const {userId , name , email , gender } = req.body;


    if(!userId ||!name || !email || !gender ){
        logger.error(errorMessages.ALL_FIELDS_REQUIRED);
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    
    const validateOtp = await User.findOneAndUpdate({userId},{name , email , gender},{new:true});
    
    if(!validateOtp){
        return res.status(404).json(errorMessages.USER_DOES_NOT_EXIST);
    }else{
        return res.status(200).json(successMessages.OTP_VERIFIED_SUCCESSFULLY);
    }


           

} catch (error) {
    logger.error(errorMessages.USER_SIGN_UP_FAILED);
    return res.status(500).json(errorMessages.INTERNAL_ERROR);
}

}
