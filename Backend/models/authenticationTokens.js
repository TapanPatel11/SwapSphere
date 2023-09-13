const mongoose = require('mongoose')
const authtoken = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true,
    }
    
})

module.exports = mongoose.model('authenticationTokens',authtoken)
