const Category = require('../../models/Category');
const errorMessages = require('../../response/errorMessages');

module.exports.getCategoryById = async function(req , res){
    const id =  req.headers['id'];

    if(!id){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    const data = await Category.findOne({id});

    console.log(data);
    if(!data){
        return res.status(404).json(errorMessages.NOT_FOUND);
    }
    
    return res.status(200).json(data);
}