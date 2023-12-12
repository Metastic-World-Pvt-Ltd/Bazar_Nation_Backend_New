const BlacklistToken = require('../../models/BlacklistToken');
const User =  require('../../models/User');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');

module.exports.logout = async function(req , res){
try {
    const {userId, token} = req.body;

    if(!token || !userId){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    try {
        const  data = new BlacklistToken({
            userId , token
        })
        await data.save();
        return res.status(200).json(successMessages.LOGGED_OUT)
    } catch (error) {
        return res.status(502).json(errorMessages.BAD_GATWAY)
    }
} catch (error) {
    return res.status(500).json(errorMessages.INTERNAL_ERROR);
}

}