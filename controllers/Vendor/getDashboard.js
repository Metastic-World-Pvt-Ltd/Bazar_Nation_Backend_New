const Vendor = require('../../models/Vendor');
const errorMessages = require('../../response/errorMessages');

module.exports.getDashboard = async function(req , res){
try {
    try {
        const total = await Vendor.countDocuments();
    
        const activeVendor = await Vendor.find({status:'Active'});
        const active = activeVendor.length;
    
        const inactiveVendor = await Vendor.find({status:'Inactive'});

        const inactive = inactiveVendor.length
    
        return res.status(200).json({total ,active ,inactive})
    } catch (error) {
        return res.status(502).json(errorMessages.BAD_GATWAY)
    }
} catch (error) {
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}
}