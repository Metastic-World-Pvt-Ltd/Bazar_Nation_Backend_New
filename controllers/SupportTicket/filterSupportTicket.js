const SupportTicket = require('../../models/SupportTicket');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.filterSupportTicket = async function(req , res){

    const status = req.params.status || req.body.status || req.query.status || req.headers["status"];

    if(status == 'All Ticket'){
        const data = await SupportTicket.find();
        return res.status(200).json(data);
    }else{
        const data = await SupportTicket.find({status});
        return res.status(200).json(data);
    }

    
}