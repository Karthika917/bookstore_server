const express = require('express')
const userController = require('../Controllers/userController')
const bookController = require('../Controllers/bookController')
const jobController = require('../Controllers/jobController')
const applicationController = require('../Controllers/applicationController')
const jwtmiddle = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')
const adminjwtmiddle = require('../Middleware/adminJwtMiddleware')
const pdfmulterConfig = require('../Middleware/pdfMulterMiddleware')

const router = express.Router()  // Create a separate route handler to organize API endpoints cleanly.

//signup - creating a new user
//localhost:3000/signup + {username:"Hari",email:"hari@gmail.com",password:"123"} + POST
//USER
router.post('/signup',userController.signup)

//signin - checking if user credentials are valid
//localhost:3000/signin + {username:"data",passord:"data"} + POST    //If you used GET, your password would show up in the URL.So POST is used here.

router.post('/signin',userController.signin)

router.post('/google-login',userController.googleSignin)

router.get('/get-profile',jwtmiddle,userController.getProfile)

router.put('/profile-update',jwtmiddle,multerConfig.single('profile'),userController.profileUpdate)

//add books
router.post('/add-book',jwtmiddle,multerConfig.array('uploadImg',3),bookController.addBook)

//get all books
router.get('/all-books',jwtmiddle,bookController.allBooksList)

//get latest books
router.get('/latest-books',bookController.latestBooksList)

//fetch book by id
router.get('/getbookbyid/:bid',jwtmiddle,bookController.getBookById)

//get user added books
router.get('/user-books',jwtmiddle,bookController.getUserBooks)

//delete book by user
router.delete('/delete-books/:bid/delete',bookController.deleteBookById)

//purchased books by user
router.get('/purchased-books',jwtmiddle,bookController.getBoughtBooks)

router.post('/apply-jobs',jwtmiddle,pdfmulterConfig.single('resume'),applicationController.addApplication)
router.get('/list-jobpost',jwtmiddle,jobController.listJobPost)

//purchasebook Stripe
router.post('/purchase-book',jwtmiddle,bookController.purchaseBookStripe)

//ADMIN
router.get('/admin/get-books',adminjwtmiddle,bookController.getAdminAllBooks)
router.put('/admin/profile-update',adminjwtmiddle,multerConfig.single('profile'),userController.adminProfileUpdate)
router.get('/admin/get-users',adminjwtmiddle,userController.getAdminAllUsers)
router.patch('/admin/approve-book/:bid',adminjwtmiddle,bookController.approveBook)
router.post('/admin/add-jobpost',adminjwtmiddle,jobController.addJobPost)
router.get('/admin/list-jobpost',adminjwtmiddle,jobController.listJobPost)
router.delete('/admin/delete-jobpost/:jid',adminjwtmiddle,jobController.deleteJobPost)
router.get('/admin/get-applications',adminjwtmiddle,applicationController.listApplications)

module.exports = router