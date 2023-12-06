const Category = require('../../models/Category');
const errorMessages = require('../../response/errorMessages');

module.exports.updateCategory = async function(req , res){
    
    const {id ,name , description , subCategory} = req.body;
    console.log(req.body , id);
    if(!id || !name || !description || !subCategory){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }

    const data = await Category.findOneAndUpdate({id},{name , subCategory , description} , {new:true});

    console.log(data);
    if(!data){
        return res.status(404).json(errorMessages.NOT_FOUND);
    }
    
    return res.status(200).json(data);

}