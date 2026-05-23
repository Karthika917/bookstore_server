const Contact = require('../Models/contactModel')

exports.sendMessage = async(req,res)=>{
    try{
    const {name,email,message} = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" })
    }
    
        const newMsg = new Contact({
            name,email,message
        })
        await newMsg.save()
        res.status(200).json("Message sent successfully")
    
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
}