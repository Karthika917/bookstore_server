const books=require('../Models/bookModel')
const stripe = require('stripe')("sk_test_51TPEKRCC0hrekfoBCnMZgey2XvQ1ZzSxWe6Rwo78kLe5QzLHoYzb5swHveyi3606e4d67jYTqMPZfArkXJXFpHMX00jjdkQkcC")

exports.addBook = async(req,res)=>{
    // console.log("Add book API")
    try{
    const {title,author,noOfPages,image,price,discountPrice,abstract,publisher,language,isbn,category} = req.body
    const uploadImg=[]
    const userMail=req.payload
    req.files.map(item=>{uploadImg.push(item.filename)})
    console.log(title,author,noOfPages,image,price,discountPrice,abstract,publisher,language,isbn,
        category,uploadImg,userMail)
    // console.log(req.body)
    // console.log(req.files)
    const existingBook = await books.findOne({userMail,title})
    console.log(existingBook)
    if(existingBook){
        res.status(401).json("You have already added the book")
    }
    else{
        const newBook = new books({
            title,author,noOfPages,image,price,discountPrice,abstract,publisher,language,isbn,
        category,uploadImg,userMail
        })
        await newBook.save()
        res.status(200).json("Book added successfully!")
    }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
   
}

//4 latest added books
exports.latestBooksList = async (req, res) => {
    try {
        const booklist = await books.find({ userMail: { $ne: req.payload } }).sort({ _id: -1 }).limit(4)
        res.status(200).json(booklist)
    } 
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//to get all books
exports.allBooksList = async(req,res)=>{
    try{
        const userMail = req.payload
        const {search} = req.query    //Query parameters are the part of the URL after the ?, usually in key=value pairs.
        console.log(search)
        let filter = {}
        search ? filter={userMail:{$ne:userMail}, title: {$regex : search, $options:'i'}} :
          filter = {userMail:{$ne:userMail}}
        const booklist = await books.find(filter)
        res.status(200).json(booklist)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//fetch book document by id
exports.getBookById = async(req,res)=>{
    try{
        const {bid} = req.params
        const bookData = await books.findById(bid)
        res.status(200).json(bookData)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//fetch user added books
exports.getUserBooks = async(req,res)=>{
    try{
       const usermail = req.payload
       const booklist = await books.find({userMail:usermail})
       res.status(200).json(booklist)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//delete books by user
exports.deleteBookById = async(req,res)=>{
    try{
       const {bid} = req.params
       const deleteBook = await books.findByIdAndDelete(bid)
       res.status(200).json("Book deleted successfully")
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//books purchased by user
exports.getBoughtBooks = async(req,res)=>{
 try{
    const usermail = req.payload
    const boughtBookList = await books.find({bought:usermail})
    res.status(200).json(boughtBookList)
 }
   catch(err){
    console.log(err)
    res.status(500).json(err)
   }
}

//Admin related Book handlers

exports.getAdminAllBooks = async(req,res)=>{
    try{
        const booklist=await books.find()
        res.status(200).json(booklist)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.approveBook = async(req,res)=>{
    try{
      const {bid} = req.params
      const updatedBook = await books.findByIdAndUpdate(bid,{status:"Approved"},{new:true})
      updatedBook.save()
      res.status(200).json(updatedBook)
      }
    
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.purchaseBookStripe=async(req,res)=>{
    try{
    const {_id,title,author,noOfPages,image,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail}=req.body
    const email=req.payload
    const updatedBook=await books.findOneAndUpdate({_id},{
           title,author,noOfPages,image,price,discountPrice,abstract,publisher,language,isbn,uploadImg,category,userMail,status:'sold',bought:email
    },{new:true})
    //checkout session 

    const line_items=[{
        price_data:{
            currency:'usd',
            product_data:{
                name:title,
               images:[image],
                description:`${author} | ${publisher}`

            },
          
            unit_amount:Math.round(discountPrice*100)

        },
        quantity:1
    }]
      metadata={
                title,author,noOfPages,image,price,discountPrice,abstract,publisher,language,isbn,uploadImg,category,userMail,status:'sold',bought:email
            }
    const session=await stripe.checkout.sessions.create({
        success_url:"http://localhost:5173/payment-success",
        cancel_url:"http://localhost:5173/payment-error",
        payment_method_types:['card'],
        line_items,
        mode:'payment'
    })
    // console.log(session)
    res.status(200).json({checkoutPaymentUrl:session?.url})
}
catch(err){
    console.log(err)
    res.status(500).json(err)
}
}