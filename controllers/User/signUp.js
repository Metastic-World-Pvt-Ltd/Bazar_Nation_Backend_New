const User = require('../../models/User');
const errorMessages = require('../../response/errorMessages');
const jwt = require('jsonwebtoken');
const logger = require('../Logger/logger');
const successMessages = require('../../response/successMessages');
require('dotenv').config({path:'../../.env'});
const uuid = require('uuid');
const OTP = require('../../models/OTP');

module.exports.signUp = async function(req, res){
// try {
    logger.info(`Start`);
    logger.info(successMessages.USER_SIGN_UP_ACTIVATED)
    var {contact , otp} = req.body;
    logger.info(`Input -  ${contact}`)
    if(!contact || !otp){
        logger.error(errorMessages.ALL_FIELDS_REQUIRED);
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    const count = await User.countDocuments();
    
    
    const email = '';
    const name  = 'Guest User';
    const validateOtp = await OTP.findOne({contact});
        
    if(validateOtp){
        if(validateOtp.otp == otp){
            if(validateOtp.expiration > Date.now() ){
                const generateID = () => {
                    const id = uuid.v4().replace(/-/g, ''); // Remove dashes from the generated UUID
                    return id;
                  };
                  
                const userId = generateID();
                
                const userData = await User.create({
                    userId , contact , name , email
                })
                const secret =  process.env.SECRET_KEY;
            
                jwt.sign({id:userData.userId, contact},secret , { algorithm: 'HS512' } , (err,token)=>{
                    if(err){
                        logger.error(`Error - ${err}`)
                        return res.json(errorMessages.SOMETHING_WENT_WRONG)
                    }
                    logger.info(`End`);
                    return res.status(200).json({token , userData})
                })
               // return res.status(200).json(successMessages.OTP_VERIFIED_SUCCESSFULLY);
            }else{
                return res.status(498).json(errorMessages.OTP_EXPIRED);
            }
        }else{
            return res.status(404).json(errorMessages.INVALID_OTP)
        }
    }else{
        return res.status(404).json(errorMessages.INVALID_OTP)
    }


// } catch (error) {
//     logger.error(errorMessages.USER_SIGN_UP_FAILED);
//     return res.status(500).json(errorMessages.INTERNAL_ERROR);
// }

}
