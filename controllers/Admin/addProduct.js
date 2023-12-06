const Product = require('../../models/Product');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
module.exports.addProduct = async function(req, res){
// try {
    console.log("insdede add product");
    const {name , description , category , subCategory , stockCount , unit , unitValue , price , mrp , costPrice , brandName , listedBy} = req.body;
    console.log(req.body);
    console.log(req.files); 
    console.log(name);
    if(!name ||!description ||!category ||!subCategory ||!stockCount ||!unit ||!unitValue ||!price ||!mrp ||!costPrice ||!brandName ||!listedBy){
        return res.status(400).json(`All Fields Required`)
    }
    console.log("files",req.files);
    const isExist = await Product.find({name});
        //split product name first 3 char
        const typeChar = name.substr(0, 2);
        //convert into UPPER case
        const upperCase = typeChar.toUpperCase();
        const productId = upperCase + Date.now();
        const variantId = Date.now();
        console.log(isExist);
    if(isExist.length != 0){
            return res.status(422).json(errorMessages.PRODUCT_ALREADY_EXIST)
    }
     //upload files
     if(req.files){
        const data = req.files;
        console.log("Data",data);
            //store file path
            const mim = data.image[0];

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
            var filePath = 'https://hohofileserver.s3.amazonaws.com/'+filename;
            
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
                       console.log("uploadResponse",uploadResponse);
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

    // try {
        const productData = await Product.create({
            productId , name , description , category , subCategory ,
            stockCount , variantId, unit , unitValue , price , mrp , 
            costPrice , brandName , listedBy  , productImage:filePath,
        }) 

        console.log(productData);

        return res.status(200).json(successMessages.PRODUCT_ADDED_SUCCESSFULLY)
    // } catch (error) {
    //     return res.json(errorMessages.BAT_GATWAY)
    // }

// } catch (error) {
//     return res.json(`Inter Srever Error`)
// }


}

