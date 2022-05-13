/*********Common Data***********/
require('dotenv').config()
const express=require('express');
const app = express();
const https=require('https');
const Port = process.env.PORT || 3006;
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> { console.log("Connected to Mongo Database")});
app.use(express.json());
/*********Common Data***********/
const nodemailer=require('nodemailer');
//const transporter=require('transporter');

/*********Signup and Signin***********/
const loginRoutes=require("./src/routes/loginRoutes");

app.use('/api',loginRoutes);
/*********Signin and Signin***********/

app.use((req, res, next) => {
     res.status(404).json({
         success: false,
         message: "Invalid HTTP request method",
       });
     });


app.all("/", (req, res) => {
     res.status(200).json({ message: "welcome to New Project" });
 });
 
 
 app.listen(Port, () => {
      console.log("Server has been started")
  })