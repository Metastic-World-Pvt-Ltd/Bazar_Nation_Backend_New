// const mongoose =  require('mongoose');

// const categoryData =  new mongoose.Schema({
//     id:{
//         type:String,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     subCategory:{
//         type:String,
//     },
//     description:{
//         type:String,
//         required:true,
//     },



// },{
//     timestamps:true
// })

// module.exports = mongoose.model('Category', categoryData);

const mongoose =  require('mongoose');

// const categoryData =  new mongoose.Schema({
//     id:{
//         type:String,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     subCategory:[
//         {
//            name:[{type:String} ]
//         },
//     ],
//     description:{
//         type:String,
//         required:true,
//     },



// },{
//     timestamps:true
// })

// const productSchema = new mongoose.Schema({
//     id: String,
//     image: String
// });

// const subCategoryItemSchema = new mongoose.Schema({
//     name: String,
//     product: productSchema
// });

// const subCategorySchema = new mongoose.Schema({
//     banner: {
//         image: String,
//         id: String
//     },
//     names: [
//         {
//             id: String,
//             subCategoryItems: [subCategoryItemSchema]
//         }
//     ]
// });

const categorySchema = new mongoose.Schema({
    id: String,
    name: String,
    subCategory: {
        banner: {
            bannerImage: String,
            bannerId: String
        },
        names: [
            {
                namesId: String,
                subCatName:String,
                subData:
                     [{
                    productName:String,
                    productData: {
                        productId:String,
                        productImage:String
                    }
                }]
            }
            
        ]
    },
    description: String,
    imageURL:String
});

module.exports = mongoose.model('Category', categorySchema);



// Main Schema
// SubcategoryItem Schema
// const subcategoryItemSchema = new mongoose.Schema({
//     productId: String,
//     productImage: String,
// });

// // Subcategory Schema
// const subcategorySchema = new mongoose.Schema({
//     banner: {
//         bannerId: String,
//         bannerImage: String,
//     },
//     // names: [{
//     //     namesId: String,
//     //     subCatName: String,
//     //     items: [{
//     //         productId: String,
//     //         productImage: String,
//     //     }],
//     // }],
//     names: {
//         type: Map,  // Use Map type for dynamic field names
//         of: [{
//             productId: String,
//             productImage: String,
//             _id: false, // Exclude _id field from subdocuments
//         }],
//     },
// });


// const categoryData = new mongoose.Schema({
//     id: String,
//     name: String,
//     subCategory: subcategorySchema,
//     description: String,
//     imageURL: String,
// });

// // Subcategory Name schema
// const subCategoryNameSchema = new mongoose.Schema({
//     namesId: { type: String, required: true },
//     // Dynamic fields for subcategories
//   }, { strict: false });
  
//   // Subcategory schema
//   const subCategorySchema = new mongoose.Schema({
//     banner: {
//       bannerImage: { type: String, required: true },
//       bannerId: { type: String, required: true }
//     },
//     names: [subCategoryNameSchema]
//   });
  
//   // Main schema
//   const categorySchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     subCategory: subCategorySchema,
//     description: { type: String, required: true },
//     imageURL: { type: String, required: true }
//   },  {
//     timestamps:true
//   });


// module.exports = mongoose.model('Category', categorySchema);