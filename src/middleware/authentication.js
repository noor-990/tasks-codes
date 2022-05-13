require('dotenv').config()
const { exist } = require('joi');
const jwt = require("jsonwebtoken");
global.dbuserId = "";
const global_accesstoken=process.env.global_accesstoken;

exports.checkAuth = async(req, res, next) => {
  
//     var g_token = req.headers.global_accesstoken  
//     if(global_accesstoken==g_token)
//     {
//           await Promise.all(
//                res.status(401).json({
//                status: true,
//                message: "success",
//                data: "",
//                })
//           )
         
//      } 
//      else
//      {
//           res.status(401).json({
//           status: false,
//           message: "Invalid accesstoken",
//           data: "",
//           });
//      }

try {
     var g_token = req.headers.global_accesstoken 
     if(global_accesstoken==g_token)
     {
          return next();
     }else{
          return  res.status(401).json({
               status: false,
               message: "Invalid accesstoken",
               data: "",
             });  
     }
   } catch (error) {
     return res.status(401).json({
       status: false,
       message: "Invalid accesstoken",
       data: "",
     });
   }
   
 };
  


exports.check_user = (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in creating group",
      data: [],
    });
  }
};

//514332d3fbc227b8ba679f303baba3bf
