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
const { logout } = require('../controllers/User/logout');
const { getProfile } = require('../controllers/User/getProfile');
const { verifyUser } = require('../middleware/verifyUser');
const { updateEmail } = require('../controllers/User/updateEmail');

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
router.post('/generateEmailOtp' ,generateEmailOtp);
//Verify Email OTP
router.post('/verifyemailotp' ,verifyEmailOtp);
//Updated Email
router.post('/updateEmail',updateEmail);
//Generate Sign up Mobile OTP
router.post('/signupotp',  generateSignupOTP );
//Genearte Sign up Email OTP
router.post('/signupemailotp' , generateSignupEMailOtp);
//User Sign UP
router.post('/signup',signUp);
//User Sign IN
router.post('/signin' ,signIn);
//Add Product to Cart
router.post('/userAddtoCart',addToCart);
//Get User Cart Details
router.get('/getusercart',getUserCart);
//Logout User
router.post('/logout' , logout);
//Get User Profile
router.get('/userprofile', verifyUser ,getProfile);

module.exports = router;