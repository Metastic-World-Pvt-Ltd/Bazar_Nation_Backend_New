const logger = require('../Logger/logger');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const OTP = require('../../models/OTP');
const User = require('../../models/User');

module.exports.verifyEmailOtp = async function(req, res){
    try {
        logger.info(`Start`);
        logger.info(successMessages.VERIFY_EMAIL_OTP_ACTIVATED)
        //check for user input
        const {otp , email} = req.body;
        logger.info(`Input OTP - ${otp} , ${email}`)

        const validateOtp = await OTP.findOne({email});
        
        if(validateOtp){
            if(validateOtp.otp == otp){
                if(validateOtp.expiration > Date.now() ){
                    const userData = await User.findOne({email});
                    
                    const secret =  process.env.SECRET_KEY;
                
                    jwt.sign({id:userData._id, contact},secret , { algorithm: 'HS512' } , (err,token)=>{
                        if(err){
                            logger.error(`Error - ${err}`)
                            return res.json(errorMessages.SOMETHING_WENT_WRONG)
                        }
                        logger.info(`End`);
                        return res.status(200).json({token , userData})
                    })
                }else{
                    return res.status(498).json(errorMessages.OTP_EXPIRED);
                }
            }else{
                return res.status(404).json(errorMessages.INVALID_OTP)
            }
        }else{
            return res.status(404).json(errorMessages.INVALID_OTP)
        }

    } catch (error) {
        logger.error(errorMessages.VERIFY_EMAIL_OTP_FAILED);
        return res.status(500).json(errorMessages.INTERNAL_ERROR)
    }

}