const logger = require('../Logger/logger');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const OTP = require('../../models/OTP');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const uuid = require('uuid');
module.exports.verifyOtp = async function(req, res){
    // try {
        logger.info(`Start`);
        logger.info(successMessages.VERIFY_OTP_ACTIVATED)
        //check for user input
        const {otp , contact} = req.body;
        logger.info(`Input OTP - ${otp} , ${contact}`)

        const validateOtp = await OTP.findOne({contact});
        
        if(validateOtp){
            if(validateOtp.otp == otp){
                if(validateOtp.expiration > Date.now() ){

                    const userData = await User.findOne({contact});
                    console.log("userData",userData);
                    if(userData){                   
                    const secret =  process.env.SECRET_KEY;
                
                    jwt.sign({id:userData.userId, contact},secret , { algorithm: 'HS512' } , (err,token)=>{
                        if(err){
                            logger.error(`Error - ${err}`)
                            return res.json(errorMessages.SOMETHING_WENT_WRONG)
                        }
                        logger.info(`End`);
                        return res.status(200).json({token , userData})
                    })
                    }else{
                        const email = '';
                        const name  = 'Guest User';  
                        const user_DOB = '';
                        const generateID = () => {
                            const id = uuid.v4().replace(/-/g, ''); // Remove dashes from the generated UUID
                            return id;
                          };
                          
                        const userId = generateID();
                        
                        const userData = await User.create({
                            userId , contact , name , email , user_DOB ,isUserExist:false
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
                    }
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
    //     logger.error(errorMessages.VERIFY_OTP_FAILED);
    //     return res.status(500).json(errorMessages.INTERNAL_ERROR)
    // }

}