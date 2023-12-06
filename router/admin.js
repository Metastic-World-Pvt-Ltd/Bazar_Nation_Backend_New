const express = require('express');
var bodyParser = require('body-parser')
const multer = require('multer');
const { addProduct } = require('../controllers/Admin/addProduct');
const { registerAdmin } = require('../controllers/Admin/registerAdmin');
const { signinAdmin } = require('../controllers/Admin/signinAdmin');
const { getAllProduct } = require('../controllers/Admin/getAllProduct');
const { deleteProduct } = require('../controllers/Admin/deleteProduct');
const { storageValue, fileFilterValue } = require('../controllers/storage');
const { getProduct } = require('../controllers/Admin/getProduct');
const { editProduct } = require('../controllers/Admin/editProduct');
const { addCategory } = require('../controllers/Admin/addCategory');
const { getAllCategory } = require('../controllers/Admin/getAllCategory');
const { deleteCategory } = require('../controllers/Admin/deleteCategory');
const { addSubCategory } = require('../controllers/Admin/addSubCategory');
const { getCategoryById } = require('../controllers/Admin/getCategoryById');
const { updateCategory } = require('../controllers/Admin/updateCategory');
const { getAllSubCategory } = require('../controllers/Admin/getAllSubCategory');
const { importProduct } = require('../controllers/Admin/importPorduct');


const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
// router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var upload = multer({
    dest: storageValue,
    fileFilter: fileFilterValue,
  });
// router.use(express.urlencoded())

router.get('/',function(req, res){
    res.send('Admin Profile')
} );
//Register Admin User
router.post('/adminsignup', registerAdmin);
//Admin Sign in
router.post('/signin',signinAdmin);

router.post('/addproduct',upload.fields([
    { name: 'image' },
  ]) , addProduct);
//Get All Products
router.get('/allproducts',getAllProduct);
//Delete Product By ID
router.post('/deleteproduct/:id',deleteProduct);
//Get Product BY Product Id
router.get('/getproduct/:id',getProduct)
//Edit Product
router.patch('/editproduct', upload.fields([
  { name: 'file' }
]),editProduct);
//Add Category
router.post('/addcategory',addCategory);
//Get All category
router.get('/allcategory',getAllCategory);
//Delete Category
router.post('/deletecategory',deleteCategory);
//Add Sub Category
router.post('/addsubcategory', addSubCategory)
//Get Category by Id
router.get('/getcategory',getCategoryById);
//Update Category by Id
router.patch('/updatecategory',updateCategory);
//Get all sub category
router.get('/allsubcategory',getAllSubCategory) ;
//import bulk product
router.post('/importproduct', upload.single('csvFile'),importProduct)

module.exports = router;