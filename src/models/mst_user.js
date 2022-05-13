const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type : String,
        required: false,
        allowNull: true
    },
    email: {
        type : String,
        required: false,
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
     password: {
        type : String,
        required: false,
        allowNull: true,
    },
    mobile_no : {
        type : Number,
        required: false,
        allowNull: true,
        match:/^[0-9]+$/
    },
    otp:{
        type:Number,
        required:false,
        default:null
    },
})

module.exports = mongoose.model('user', userSchema);