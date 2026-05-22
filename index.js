//importing and configuring dotenv for environment variables
require('dotenv').config()

//importing express.js module
const express=require('express')

const routes = require('./Routes/routes')
const cors = require('cors')


//creating server app instance
const app=express()

//importing mongodb connection
require('./Connection/connection')

//configuring cors to app
app.use(cors())

//configuring json middleware into app
app.use(express.json())


//configuring routes into app
app.use(routes)

app.use('/uploadImg', express.static('bookImages'))   // Serves static files from 'bookImages' folder; access via /uploadImg/<filename>

//serving uploaded resumes to client side
app.use('/resumes', express.static('ResumeFiles'))

//setting a specific port number
const PORT=process.env.PORT || 3000

//request handler
// const reqHandler=(req,res)=>{
//     res.send("Request Hit")
// }

// const bookList=(req,res)=>{
//     res.send("Book request hit")
// }

//configuring /setting reqHandler
// app.use('/',reqHandler)
// app.use('/books',bookList)


//turning on listening mode for server , so it runs 

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`server running at http://localhost:${PORT}`)
    }
})