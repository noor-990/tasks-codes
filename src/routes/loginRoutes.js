const express = require('express');
const router = express.Router();
//const transporter=require('transporter');
const nodemailer=require('nodemailer');
//middleware to use for all requests
const schemas = require("../middleware/schema");
const middleware = require("../middleware/joi-validation");
const { checkAuth } = require("../middleware/authentication");

const {signup,signin,verifyemail,verifyotp,resetpassword}=require("../controllers/loginController")

router.post('/signup',checkAuth, middleware(schemas.signup_schema),signup);
router.post('/signin',checkAuth, middleware(schemas.signin_schema),signin);
router.post('/verifyemail',verifyemail);
router.post('/verifyotp',verifyotp);
router.post('/resetpassword',resetpassword);

module.exports = router;