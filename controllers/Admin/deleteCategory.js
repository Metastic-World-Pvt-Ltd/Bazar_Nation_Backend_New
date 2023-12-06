const Category = require('../../models/Category');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.deleteCategory = async function(req , res){
try {
    logger.info(successMessages.START);
    logger.info(successMessages.DELETE_CATEGORY_ACTIVATED)
    const id = req.headers['id'];
    logger.info(`Input - ${id}`)
    if(!id){
        logger.error(errorMessages.ALL_FIELDS_REQUIRED);
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    try {
        const data = await Category.findOneAndDelete({id});

        if(!data){
            logger.error(errorMessages.NOT_FOUND);
            return res.status(404).json(errorMessages.NOT_FOUND)
        }
    
        console.log(data);
    
        return res.status(200).json(data);
    } catch (error) {
        logger.error(error);
        return res.status(502).json(errorMessages.BAD_GATWAY);
    }
} catch (error) {
    logger.error(errorMessages.DELETE_CATEGORY_FAILED)
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}
}