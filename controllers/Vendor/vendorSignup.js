const Vendor = require('../../models/Vendor');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');

module.exports.vendorSignup = async function(req , res){
    const { vendorName , contact , email , password , storeName , productType , city , state } = req.body;

    if(!vendorName || !contact || !email || !password || !productType || !city || !state ){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED)
    }
    
    const isExist = await Vendor.findOne({contact});

    if(isExist){
        if(isExist.contact == contact){
            return res.status(422).json(errorMessages.CONTACT_ALREADY_EXIST);
        }

        if(isExist.email == email ){
            return res.status(422).json(errorMessages.EMAIL_ALLREADY_EXIST);
        }
    }

    try {
        //generate Vendor ID
        const stringWithoutSpaces = storeName.replace(/ /g, ''); // Remove spaces
        const firstThreeCharacters = stringWithoutSpaces.slice(0, 3); // Get the first 3 characters
        const upperCase = firstThreeCharacters.toUpperCase();
        const vendorId =  upperCase + Date.now();

        const vendorData = new Vendor({
            vendorId ,vendorName , contact , email , password , storeName , productType , city , state 
        })

        await vendorData.save();
        return res.status(200).json(successMessages.VENDOR_SIGNUP_SUCCESSFULLY)
    } catch (error) {
        return res.json(errorMessages.SOMETHING_WENT_WRONG);
    }
    

}