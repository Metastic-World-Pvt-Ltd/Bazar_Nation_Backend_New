const express = require('express');

const router = express.Router();

console.log('Router Loaded SuccessFully!');


router.get('/', function(req, res){
    res.send(`Main Home Router`)
});
router.use('/user', require('./user'));
router.use('/admin',require('./admin'));
router.use('/vendor', require('./vendor'));
router.use('/support',require('./support'));


module.exports = router;