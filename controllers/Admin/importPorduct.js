const User = require('../../models/User');
const fs = require('fs')
const csvParser = require('csv-parser');
const stream = require('stream');

module.exports.importProduct = async function(req, res){
  const bufferData = req.file.buffer;
log
  try {
    const data = await new Promise((resolve, reject) => {
      console.log("inside function");
      const results = [];
      const readableStream = new stream.Readable();
      readableStream.push(bufferData);
      readableStream.push(null);

      readableStream
        .pipe(csvParser())
        .on('data', (row) => {
          console.log("rowData",row);
          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    // Generate productId and save products to the database
    console.log("Data",data);
    await Promise.all(
      data.map(async (row) => {
        const newProduct = new User({
          userId: generateProductId(), 
          contact: row.contact,
          name: row.name,
          
          // Use a function to generate productId
        });

        await newProduct.save();
      })
    );

    res.send('Products imported successfully');
  } catch (error) {
    console.error('Error importing products:', error);
    res.status(500).send('Internal Server Error');
  }

  function generateProductId() {
    return Math.floor(Math.random() * 1000) + 1; // Example: Random number between 1 and 1000
  }
}