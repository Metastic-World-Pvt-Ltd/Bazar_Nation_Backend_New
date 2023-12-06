const Subategory = require('../../models/Subcategory');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.addSubCategory = async function(req , res){
try {
    logger.info(successMessages.START);
    logger.info(successMessages.ADD_SUB_CATEGORY_ACTIVATED)
    const {category , name , description} = req.body;
    
    
    logger.info(`Input - ${category} ${name} , ${description}`)
    if(!category || !name || !description){
        logger.error(errorMessages.ALL_FIELDS_REQUIRED)
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    try {
        const isExist = await Subategory.findOne({name});

        if(isExist){
            logger.error(errorMessages.CATEGORY_ALREADY_EXIST)
            return res.status(422).json(errorMessages.CATEGORY_ALREADY_EXIST)
        }
        const id = Date.now();
    
        const data = await Subategory.create({
            id ,category , name , description
        })
        logger.info(successMessages.RECORD_ADDED_SUCCESSFULLY);
        logger.info(successMessages.END)
        return res.status(200).json(data)
    } catch (error) {
        logger.error(error);
        return res.status(502).json(errorMessages.BAD_GATWAY)
    }
} catch (error) {
    logger.error(errorMessages.ADD_SUB_CATEGORY_FAILED)
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}
}