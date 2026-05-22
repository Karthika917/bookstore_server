const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./bookImages')
    },
    filename:(req,file,cb)=>{
        const filename = `Image-${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="image/jpg" || file.mimetype==="image/png" || file.mimetype==="image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig