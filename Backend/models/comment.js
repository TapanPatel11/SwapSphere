const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    productID: {
        type:String,
        required:true
    },
    useremail: {
        type:String,
        required:true
    },
    commentText:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
   
})
module.exports = mongoose.model('Comment',commentSchema)
