const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./ResumeFiles')
    },
    filename:(req,file,cb)=>{
        const filename = `Resume-${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const pdfmulterConfig = multer({
    storage,
    fileFilter
})

module.exports = pdfmulterConfig