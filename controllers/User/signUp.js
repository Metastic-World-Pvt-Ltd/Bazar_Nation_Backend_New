const User = require('../../models/User');
const errorMessages = require('../../response/errorMessages');
const jwt = require('jsonwebtoken');
const logger = require('../Logger/logger');
const successMessages = require('../../response/successMessages');
require('dotenv').config({path:'../../.env'});
const uuid = require('uuid');

module.exports.signUp = async function(req, res){
try {
    logger.info(`Start`);
    logger.info(successMessages.USER_SIGN_UP_ACTIVATED)
    var {contact , name , email} = req.body;
    logger.info(`Input -  ${contact} , ${name}`)
    if(!contact || !name){
        logger.error(errorMessages.ALL_FIELDS_REQUIRED);
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    const count = await User.countDocuments();
    
    if(!email){
        email = '';
    }
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
    const generateID = () => {
        const id = uuid.v4().replace(/-/g, ''); // Remove dashes from the generated UUID
        return id;
      };
      
    const userId = generateID();
    
    const isExist = await User.findOne({contact});

    if(isExist){
        logger.error(errorMessages.CONTACT_ALREADY_EXIST);
        return res.status(422).json(errorMessages.CONTACT_ALREADY_EXIST);
    }

    const userData = await User.create({
        userId , contact , name , email
    })
    const secret =  process.env.SECRET_KEY;

    jwt.sign({id:userData._id, contact},secret , { algorithm: 'HS512' } , (err,token)=>{
        if(err){
            logger.error(`Error - ${err}`)
            return res.json(errorMessages.SOMETHING_WENT_WRONG)
        }
        logger.info(`End`);
        return res.status(200).json({token , userData})
    })
} catch (error) {
    logger.error(errorMessages.USER_SIGN_UP_FAILED);
    return res.status(500).json(errorMessages.INTERNAL_ERROR);
}

}
