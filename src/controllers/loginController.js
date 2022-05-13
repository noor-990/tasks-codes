const express = require("express");
const moment = require("moment");
const user=require("../models/mst_user");
const bcrypt=require('bcrypt');
const hash=require('hash')
const nodemailer=require('nodemailer')
const encode=require('encode');
const req = require("express/lib/request");
var async = require('async');
const crypto=require('crypto');

const utctimedate = moment().utcOffset(0).format("YYYY-MM-DD HH:mm:ss");
const utctime = moment().utc().format("hh:mm:ss");
const utcdate = moment().utc().format("YYYY-MM-DD");



/*****************Mail*******************/
function sendmail(email,subject,description) {
     var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
     user: 'sindhuri.r7@gmail.com',
     pass: 'sindhuja'
     }
     });
     var mailOptions = {
     from: 'sindhuri.r7@gmail.com',
     to: email,
     subject: subject,
     text: description
     };
     transporter.sendMail(mailOptions, function(error, info){
     if (error) {
     console.log(error);
     } else {
     console.log('Email sent: ' + info.response);
     }
     });
     }
     /*****************Mail***************/

/***********Signup************/
exports.signup=(async(req, res,err) => {     
     const data=await user.find({"email": req.body.email}).then(async result => {             
     if (result.length !== 0) 
     {          
          res.status(400).json({message: 'Email already exists',status: false})
     }
     else
     {
          const salt = await bcrypt.genSalt(10);
          const pass = await bcrypt.hash(req.body.password, salt);
                 const userdata=new user({
                    "user_name":req.body.user_name,
                    "email":req.body.email,
                    "password":pass,
                    "mobile_no":req.body.mobile_no
               })
               userdata.save((err,results)=>{
                    if (err) 
                    {
                         return res.status(400).send({
                         status: false,
                         message: "Error in creating user",
                         data: [],
                         });
                    } 
                    if (results) 
                    {
                         return  res.status(200).send({status: true,
                              message: "created user successfully",
                              data: results,
                         });
                    }          
               })
          }  
  })
})
/***********Signup************/


/***********Signin***********/
exports.signin=async(req,res,error)=>{
     try{
      await user.find({"email": req.body.email}).then(async result => {             
          if (result.length == 0) 
          {          
               res.status(400).json({message: 'Email not exists',status: false})
          }
          else{
                bcrypt.compare(req.body.password,result[0].password,(err,result) => {
                    if(result===true){
                       res.status(200).json({status:true, message: "success",data: result})  
                    }else{
                         res.status(400).json({status:false, message: "invalid password",data: []})  
                    }
               })
          }
     })
}catch(err){
     res.status(500).json({status:false, message: "error",data: []})
     }
}
/***********Signin***********/


/************Forgot Password***************/

/***********Verify Email***********/
exports.verifyemail=async(req,res)=>{
     await user.find({"email": req.body.email}).then(async result => {             
          if (result.length == 0) 
          {          
               res.status(201).json({message: 'Email not exists',status: false})
          }
          else{
               var val = Math.floor(1000 + Math.random() * 9000);
               let subject = 'OTP';
               let description = 'OTP to verify : '+val;
               const data=await user.updateOne({email: req.body.email},{$set:{otp:val}});            
               const resdata = sendmail(req.body.email,subject,description);
               return res.status(200).json({status:true, message: "success",data: req.body.email})
          }
     })
}
/***********Verify Email***********/

/***********Verify OTP***********/
exports.verifyotp=async(req,res)=>{
     var email = req.body.email;
     var otp = req.body.otp;

     await user.find({"email":email}).then(async(result) => {             
          if (result.length == 0) 
          {          
               res.status(201).json({message: 'Email not exists',status: false})
          }
         else 
         {
               if(req.body.otp==result[0].otp){
                    return res.status(200).json({status:true, message:"Valid OTP",data:req.body.email});
               }
               else{
               return res.status(200).json({status:true, message: 'Invalid OTP',data:[]});
               }
          }
});
}
/***********Verify OTP***********/

/******Reset Password***********/
exports.resetpassword =(async(req,res)=>{
try{
     var email;
     const data =await user.find({"email":req.body.email}).then(async result => {             
          if (result.length == 0) 
          {          
               res.status(201).json({message: 'Email not exists',status: false})
          }
          else
          {
               const salt = await bcrypt.genSalt(10);
               const pass = await bcrypt.hash(req.body.password, salt);    
               const userdata=await user.updateOne({"email":req.body.email},{$set:{password:pass}})
               return res.status(201).send({status: true,message: "Password updated successfully",data: userdata,})
          }
         })
     }catch (error) {      
      res.status(500).send({status: false,message: "Error ",data: [],});
     }
});   

/******Reset Password***********/
/************Forgot Password***************/
