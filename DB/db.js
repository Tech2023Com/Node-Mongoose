const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/pg-may' ,{useNewUrlParser :  true})
// mongoose.connect('mongodb://127.0.0.1:27017/pg-may' ,{useNewUrlParser :  true})


const db = mongoose.connection; 



db.on("error" , function(){
    console.log("Something Went Wrong !! Not Connected with mongo")
})

db.once('open' ,  function(){
    console.log("Sucessfully Connected with mongodb")
})

module.exports =  db

