const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    noOfPages:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    abstract:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    uploadImg:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    userMail:{
        type:String,
        required:true
    },
    bought:{
        type:String,
        default:""
    }
 })

 
const books=mongoose.model('books',bookSchema)
 

 module.exports=books


 
