const express = require('express');
const { generateOtp } = require('../controllers/User/generateOtp');
const { verifyOtp } = require('../controllers/User/verifyOtp');
const { generateEmailOtp } = require('../controllers/User/generateEmailOtp');
const { verifyEmailOtp } = require('../controllers/User/verifyEmailOtp');
const { loginRateLimiter } = require('../middleware/loginRateLimiter');
const { signUp } = require('../controllers/User/signUp');
const { signIn } = require('../controllers/User/signIn');
const { generateSignupOTP } = require('../controllers/User/generateSignupOTP');
const { generateSignupEMailOtp } = require('../controllers/User/generateSignupEMailOtp');
const { addToCart } = require('../controllers/User/addToCart');
const { getUserCart } = require('../controllers/User/getUserCart');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:false}))

router.get('/',function(req, res){
    res.send('User Profile')
} );

//genearte Mobile OTP
router.post('/generateOtp' ,generateOtp);
//Verify OtP
router.post('/verifyOtp' ,verifyOtp);
//generate Email OTP
router.post('/genrateemailotp' ,generateEmailOtp);
//Verify Email OTP
router.post('/verifyemailotp' ,verifyEmailOtp);
//Generate Sign up Mobile OTP
router.post('/signupotp',  generateSignupOTP );
//Genearte Sign up Email OTP
router.post('/signupemailotp' , generateSignupEMailOtp);
//User Sign UP
router.post('/signup',signUp);
//User Sign IN
router.post('/signin' ,signIn);
//Add Product to Cart
router.post('/addtocart',addToCart);
//Get User Cart Details
router.get('/getusercart',getUserCart);

module.exports = router;