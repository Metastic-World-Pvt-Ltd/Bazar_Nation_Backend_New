const Vendor = require('../../models/Vendor');
const errorMessages = require('../../response/errorMessages');

module.exports.getVendors = async function(req , res){
try {
    try {
        const data = await Vendor.find({},{password:0});

        return res.status(200).json(data);
    } catch (error) {
        return res.status(502).json(errorMessages.BAD_GATWAY)
    }
} catch (error) {
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}
}