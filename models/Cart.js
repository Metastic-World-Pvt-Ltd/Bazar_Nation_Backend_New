const mongoose =  require('mongoose');

// const cartData =  new mongoose.Schema({
//     itmeId:{
//         type:String,
//         required:true,
//     },
//     userId:{
//         type:String,
//     },
//     productId:{
//         type:String,
//         required:true,
//     },
//     qty:{
//         type:String,
//         required:true,
//     },


// },{
//     timestamps:true
// })

// Define the item schema
const itemSchema = new mongoose.Schema({
    itemId: {
      type: {
        name: String,
        productImage: String,
        description: String,
        brandName: String,
        price: Number,
        mrp: Number,
        subCategory: String,
        category: String,
      },
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },

  });
  
  // Define the cart schema
  const cartSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    items: [
        {
            itemId: {
              type: {
                productId:String,
                name: String,
                productImage: String,
                description: String,
                brandName: String,
                price: Number,
                mrp: Number,
                subCategory: String,
                category: String,
              },
              required: true,
            },
            qty: {
              type: Number,
              required: true,
            },
        
          }
    ],
    bill: {
      type: Number,
      required: true,
    },

  },{
    timestamps:true
  });

module.exports = mongoose.model('Cart', cartSchema);