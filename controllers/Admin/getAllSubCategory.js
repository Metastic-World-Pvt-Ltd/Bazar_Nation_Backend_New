const Subcategory = require('../../models/Subcategory');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.getAllSubCategory = async function(req, res){
    logger.info(successMessages.START);
    logger.info(successMessages.GET_ALL_CATEGORY_ACTIVATED)

    try {
        const data =  await Subcategory.find();

        console.log(data);
        logger.info(successMessages.DATA_SEND_SUCCESSFULLY)
        return res.status(200).json(data)
    } catch (error) {
        logger.error(error)
        return res.status(502).json(errorMessages.BAD_GATWAY)
    }
}