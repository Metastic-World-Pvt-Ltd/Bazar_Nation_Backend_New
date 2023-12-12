const User = require('../../models/User');
const errorMessages = require('../../response/errorMessages');

module.exports.getProfile = async function(req , res){
    const userId = req.headers['id'];

    if(!userId){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    const data =  await User.findOne({userId});

    if(data){
        return res.status(200).json(data);
    }else{
        return res.status(404).json(errorMessages.NOT_FOUND);
    }
}