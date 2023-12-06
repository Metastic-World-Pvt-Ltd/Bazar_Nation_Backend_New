const User = require('../../models/User'); 
require('dotenv').config({path:'../../.env'});
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');
const OTP = require('../../models/OTP');


module.exports.generateSignupOTP = async function(req, res){
try {
    logger.info(`Start`);
    logger.info(successMessages.GENERATE_OTP_ACTIVATED);
    //user input
    const {contact} = req.body;
    logger.info(`Input - ${contact}`)
   
    if(!contact){
        return res.status(400).json(errorMessages.CONTACT_IS_REQUIRED)
    }

    const checkUser = await User.findOne({contact});

    if(checkUser){
        return res.status(422).json(errorMessages.CONTACT_ALREADY_EXIST);
    }

        const otpInt = Math.floor(1000 + Math.random() *9000);
        const otp = otpInt.toString();
        console.log(otp);
        logger.info(`OTP - ${otp}`)
        //set otp expiry time
        const expiration= Date.now() + 120000;
        
        // module.exports.expiration = expiration;
        // module.exports.otp = otp;
        const isExist =  await OTP.findOne({contact});
        // console.log(isExist);
        if(isExist){
            const otpData = await OTP.findOneAndUpdate({contact},{otp , expiration},{new:true})
        }else{
            const otpData = await OTP.create({
                contact , otp , expiration 
            })
        }

        //sent otp to mobile
        const accountSid = process.env.accountSid;
        const authToken = process.env.authToken;
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
            .create({
                body: `Enter the ${otp} to verify you Please do not share the OTP  `,
                from: '+12292672362',
                to: contact,
            })
            //.then(message => console.log(message.sid))
            .catch((error) => {
                console.log(error);
              });
            logger.info(successMessages.OTP_SENT_SUCCESSFULLY)
            logger.info(`End`);
            return res.status(200).json(successMessages.OTP_SENT_SUCCESSFULLY);    


} catch (error) {
    logger.error(errorMessages.GENERATE_OTP_FAILED)
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}

}