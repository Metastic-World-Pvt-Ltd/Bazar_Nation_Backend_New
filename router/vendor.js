const express = require('express');
const { vendorSignup } = require('../controllers/Vendor/vendorSignup');
const { verifyEmailOtp } = require('../controllers/User/verifyEmailOtp');
const { verifyOtp } = require('../controllers/User/verifyOtp');
const { signupEmailOtp } = require('../controllers/Vendor/signupEmailOtp');
const { signupMobileOtp } = require('../controllers/Vendor/signupMobileOtp');


const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:false}))

router.get('/',function(req, res){
    res.send('Vendor Profile')
} );

//Generate Email OTP
router.post('/emailotp',signupEmailOtp);
// Generate Mobile OTP
router.post('/mobileotp',signupMobileOtp);
//Verify Email OTP
router.post('/verifyemail',verifyEmailOtp);
//Verify Mobile OTP
router.post('/verifymobile',verifyOtp);

router.post('/vendorsignup',vendorSignup);

module.exports = router;