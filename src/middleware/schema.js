const Joi = require("joi");
const mongoose = require("mongoose");

const schemas = {
    signup_schema: Joi.object().keys({
    user_name: Joi.string().required().label("User Name"),
    email: Joi.string().required("email"),
    password:Joi.string().required("password"),
    mobile_no:Joi.string().length(10).pattern(/^[0-9]+$/).required("mobile_no")
  }),
  signin_schema: Joi.object().keys({
     email: Joi.string().required().label("email"),
     password:Joi.string().required("password")
  })
};
module.exports = schemas;
