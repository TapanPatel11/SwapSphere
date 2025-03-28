const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const protectRoute = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token =req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,"abc123");
            req.User = await User.findById(decoded.id).select('-password')
            next()
        }
        catch(error){
            console.log(error)
            res.status(401)
            throw new Error('NotAuthorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('NotAuthorized, no token')
    }
}
)
module.exports = {protectRoute}