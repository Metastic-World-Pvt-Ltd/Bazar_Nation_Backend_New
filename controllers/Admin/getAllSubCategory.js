const Category = require('../../models/Category');
const Subcategory = require('../../models/Subcategory');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.getAllSubCategory = async function(req, res){
    logger.info(successMessages.START);
    logger.info(successMessages.GET_ALL_CATEGORY_ACTIVATED)
    const id = req.headers['id'];
    try {
        const data =  await Category.findOne({id});

        if(!data){
            return res.status(404).json('No Record Found')
        }
        logger.info(successMessages.DATA_SEND_SUCCESSFULLY)
        return res.status(200).json({'data':data})
    } catch (error) {
        logger.error(error)
        return res.status(502).json(errorMessages.BAD_GATWAY)
    }
}