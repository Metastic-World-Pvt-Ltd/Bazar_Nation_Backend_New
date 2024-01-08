// const Category = require('../../models/Category');
// const errorMessages = require('../../response/errorMessages');
// const successMessages = require('../../response/successMessages');
// const logger = require('../Logger/logger');

// module.exports.addCategory = async function(req , res){
// try {
//     logger.info(successMessages.START);
//     logger.info(successMessages.ADD_CATEGORY_ACTIVATED)
//     var {name ,subCategory , description} = req.body;
//     console.log(req.body);

//     logger.info(`Input - ${name} , ${description}`)
//     if(!name || !description){
//         logger.error(errorMessages.ALL_FIELDS_REQUIRED)
//         return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
//     }
//     if(!subCategory){
//         subCategory = '-'
//     } 
//     try {
//         const isExist = await Category.findOne({name});

//         if(isExist){
//             logger.error(errorMessages.CATEGORY_ALREADY_EXIST)
//             return res.status(422).json(errorMessages.CATEGORY_ALREADY_EXIST)
//         }
//         const id = Date.now();

//         const data = await Category.create({
//             id , name , subCategory, description
//         })
//         logger.info(successMessages.RECORD_ADDED_SUCCESSFULLY);
//         logger.info(successMessages.END)
//         return res.status(200).json(data)
//     } catch (error) {
//         logger.error(error);
//         return res.status(502).json(errorMessages.BAD_GATWAY)
//     }
// } catch (error) {
//     logger.error(errorMessages.ADD_CATEGORY_FAILED)
//     return res.status(500).json(errorMessages.INTERNAL_ERROR)
// }
// }

const Category = require('../../models/Category');
const errorMessages = require('../../response/errorMessages');
const successMessages = require('../../response/successMessages');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const logger = require('../Logger/logger');
const { v4: uuidv4 } = require('uuid');

var imageURL, bannerImage, productImage;
module.exports.addCategory = async function (req, res) {
    // try {
    logger.info(successMessages.START);
    logger.info(successMessages.ADD_CATEGORY_ACTIVATED)
    const { name, subCatName, description, productName } = req.body;


    logger.info(`Input - ${name} , ${description}`)
    if (!name || !description || !subCatName) {
        logger.error(errorMessages.ALL_FIELDS_REQUIRED)
        return res.status(400).json(errorMessages.ALL_FIELDS_REQUIRED);
    }
    // if(!subCategory){
    //     subCategory = '-'
    // } 
    // try {
    const isExist = await Category.findOne({ name });

    if (isExist) {
        logger.error(errorMessages.CATEGORY_ALREADY_EXIST)
        return res.status(422).json(errorMessages.CATEGORY_ALREADY_EXIST)
    }

    //upload files
    if (req.files) {
        const data = req.files;
        console.log("Data", data);
        //store file path
        imageURL = await uploadFile(data.imageURL[0])
        bannerImage = await uploadFile(data.bannerImage[0])
        productImage = await uploadFile(data.productImage[0])

        console.log(imageURL);
    }

    const id = uuidv4();
    const bannerId = id;
    const namesId = uuidv4();
    const productId = uuidv4();

    // const subCategory = {
    //     banner: {
    //         bannerImage,
    //         bannerId
    //     },
    //     names: [{
    //         namesId,
    //         subCatName,
    //         items: [{
    //             productId,
    //             productImage,
    //         }],
    //     }],
    // };
    
    const inputData = {
        id,
        name,
        subCategory: {
          banner: {
            bannerImage,
            bannerId
          },
          names: [
            {
                namesId,
                subCatName,
                subData:{
                    productName,
                    productData: {
                        productId,
                        productImage
                    }
                
            }
            }
        ]
        },
        description,
        imageURL
      };

    const data = await Category.create(inputData)
    logger.info(successMessages.RECORD_ADDED_SUCCESSFULLY);
    logger.info(successMessages.END)
    return res.status(200).json(data)
    // } catch (error) {
    //     logger.error(error);
    //     return res.status(502).json(errorMessages.BAD_GATWAY)
    // }
    // } catch (error) {
    //     logger.error(errorMessages.ADD_CATEGORY_FAILED)
    //     return res.status(500).json(errorMessages.INTERNAL_ERROR)
    // }
}

async function uploadFile(mim) {
    //const mim = data.imageURL[0];

    //split file extention name   
    const parts = mim.mimetype.split('/')
    const ext = parts[1];
    //define allowed file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(mim.mimetype)) {
        //check file size
        if (mim.size < 1000000) {
            //file name
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filename = `${mim.fieldname}-${uniqueSuffix}.${mim.originalname.split('.').pop()}`;

            //Store filepath
            const filePath = 'https://hohofileserver.s3.amazonaws.com/' + filename;

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
                    console.log("uploadResponse", uploadResponse);

                } catch (err) {
                    console.error('Error uploading to S3 or saving to MongoDB:', err);
                    return (errorMessages.SOMETHING_WENT_WRONG);
                }
            }
            // Call the function to upload the file and save the S3 URL to the database
            uploadFileAndSaveToDatabase();
            return filePath;
            //end of Aws
        } else {
            logger.error(errorMessages.MAX_ALLOWED_SIZE)
            return (errorMessages.MAX_ALLOWED_SIZE);

        }

    } else {
        logger.error(errorMessages.INVALID_FILE)
        return errorMessages.INVALID_FILE;
    }
}