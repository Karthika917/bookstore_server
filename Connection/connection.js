const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING 

mongoose.connect(connectionString).then(res=>{
    console.log("Server connected with Mongodb server")
}).catch(err=>{
   console.log(err)
})