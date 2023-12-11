const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./mongoose/mongoose');
const port  = process.env.PORT || 6000 ;
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',require('./router/index'));

app.listen(port , function(err){
    if(err){
        console.log(err);
        return err;
    }
    console.log(`Hoho Express Server is Running on port :${port}`);

})