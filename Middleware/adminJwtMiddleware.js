const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req,res,next)=>{
    try{
       console.log("Request hit at Admin JWT middleware") 
       const token = req?.headers?.authorization?.split(" ")[1]
       const decode_value = jwt.verify(token,process.env.SECRET_KEY)
       console.log(decode_value)
       req.payload = decode_value.email
       next()
    }
    catch(err){
        console.log(err)
        res.status(404).json("Invalid token")
    }
    
}

module.exports =  adminJwtMiddleware


