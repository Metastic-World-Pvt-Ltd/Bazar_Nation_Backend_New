const SupportTicket = require('../../models/SupportTicket');
const User = require('../../models/User');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.createSupportTicket = async function(req , res){
try {
    logger.info(successMessages.CREATE_SUPPORT_TICKET_ACTIVATED);
    logger.info(successMessages.START);
    var {userId ,issue ,description ,category ,priority} = req.body;
    
    if(!userId || !issue || !description || !category || !priority){
        logger.error(errorMessages.ALL_FIELDS_REQUIRED);
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    try {
        const userData = await User.findOne({userId});
        if(!userData){
            logger.error(errorMessages.NOT_FOUND);
            return res.status(404).json(errorMessages.NOT_FOUND)
        }
        
        const data =  await SupportTicket.countDocuments();
        let formattedNumber;
        counter = data + 1;
        if (counter < 10) {
            formattedNumber = counter.toString().padStart(7, '0');
        } else if (counter < 100) {
            formattedNumber = counter.toString().padStart(7, '0');
        }else if (counter < 1000) {
            formattedNumber = counter.toString().padStart(7, '0');
        }else if (counter < 10000) {
            formattedNumber = counter.toString().padStart(7, '0');
        }else if (counter < 100000) {
            formattedNumber = counter.toString().padStart(7, '0');
        }else if (counter < 1000000) {
            formattedNumber = counter.toString().padStart(7, '0');
        }
         else {
            formattedNumber = counter.toString();
            
        }

        const ticketId = 'INC'+ formattedNumber;
        const userName = userData.name;
        const contact = userData.contact;
        var email = userData.email;
        const status = 'New';
        const assignedTo = 'empty';
        if(!email){
            email = ''
        }
        const enquiryData = await SupportTicket.create({
             ticketId ,userName, contact , email ,  issue, description , category, priority , assignedTo, status , 
        })

        logger.info(successMessages.TICKET_CREATED_SUCCESSFULLY)
        logger.info(successMessages.END);
        return res.status(200).json(`${successMessages.TICKET_CREATED_SUCCESSFULLY} Your Ticket Id is - ${enquiryData.ticketId}`);
    } catch (error) {
        logger.error(error);
        return res.json(error);
    }

} catch (error) {
    logger.error(errorMessages.CREATE_TICKET_FAILED);
    return res.status(500).json(errorMessages.INTERNAL_ERROR);
}
    

}