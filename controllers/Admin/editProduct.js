const Product = require('../../models/Product');
const errorMessages = require('../../response/errorMessages');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const successMessages = require('../../response/successMessages');
const logger = require('../Logger/logger');

module.exports.editProduct =  async function(req, res){
try {    logger.info(successMessages.START)
    logger.info(successMessages.EDIT_PRODUCT_ACTIVATED)
    var {productId ,name , description , category , subCategory , stockCount , unit , unitValue , price , mrp , costPrice, filePath } = req.body;

    if(!productId || !name || !description || !category || !subCategory || !stockCount || !unit || !unitValue || !price || !mrp || !costPrice){
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
   
    const isExist =  await Product.findOne({productId});
    if(!isExist){
        logger.error(errorMessages.NOT_FOUND);
        return res.status(404).json(errorMessages.NOT_FOUND)
    }
    
    if(!filePath){
        if(req.files){
                //store file path
                const mim = req.files.file[0];
    
            //split file extention name   
            const parts = mim.mimetype.split('/')
            const ext = parts[1];
            //define allowed file types
            const allowedTypes = ['image/jpeg', 'image/jpg','image/png'];
                if (allowedTypes.includes(mim.mimetype)) {
                    //check file size
                    if(mim.size < 1000000){
                       //file name
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const filename = `${mim.fieldname}-${uniqueSuffix}.${mim.originalname.split('.').pop()}`;
    
                        //Store filepath
                     filePath = 'https://hohofileserver.s3.amazonaws.com/'+filename;
                
                 //aws opertaion
                     const credentials = {
                         accessKeyId: process.env.ACCESS_KEY,
                         secretAccessKey: process.env.SECERET_KEY
                       };
                       const region = process.env.BUCKET_REGION;
                       const bucketName = process.env.BUCKET_NAME;
                       const fileName = filename;
                       const fileContent = Buffer.from(mim.buffer);;
                       const s3 = new S3Client({ region, credentials });
                       async function uploadFileAndSaveToDatabase() {
                         // Set the S3 parameters
                         const params = {
                           Bucket: bucketName,
                           Key: fileName,
                           ContentType: 'image/png',
                           Body: fileContent,
                         };
                         try {
                           // Upload the file to S3
                           const uploadResponse = await s3.send(new PutObjectCommand(params));
                           
                         } catch (err) {
                           console.error('Error uploading to S3 or saving to MongoDB:', err);
                           return res.json(errorMessages.SOMETHING_WENT_WRONG);
                         }
                       }
                       // Call the function to upload the file and save the S3 URL to the database
                       uploadFileAndSaveToDatabase();
                     //end of Aws
                    }else{
                        logger.error(errorMessages.MAX_ALLOWED_SIZE)
                        return res.status(400).json(errorMessages.MAX_ALLOWED_SIZE);
                      
                    }
    
                } else {
                   logger.error(errorMessages.INVALID_FILE) 
                   return res.status(400).json(errorMessages.INVALID_FILE);
                }
            }
    }
    try {
        const productData = await Product.findOneAndUpdate({productId},{
            name , description , category , subCategory ,
            stockCount , unit , unitValue , price , mrp , 
            costPrice  , productImage:filePath,
        }) 
        logger.info(successMessages.PRODUCT_UPDATED_SUCCESSFULLY)
        logger.info(successMessages.END);
        return res.status(200).json(successMessages.PRODUCT_UPDATED_SUCCESSFULLY)
    } catch (error) {
        logger.error(error)
        return res.json(errorMessages.BAT_GATWAY)
    }
    
} catch (error) {
    logger.error(errorMessages.EDIT_PRODUCT_FAILED)
    return res.status(500).json(errorMessages.INTERNAL_ERROR)
}
}
