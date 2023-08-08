const mongoose= require("mongoose")

//creating collection
// https://www.mongodb.com/developer/products/mongodb/cheat-sheet/#connect-mongodb-shell

const xx=mongoose.Schema({
     //id auto gen 
     "name":{"first":String , "last":String},    //general info     
     "account": {"email":String, "password":String},   //account // scramble user password //https://www.npmjs.com/package/bcrypt
})

const user= mongoose.model("user",xx)


module.exports=user;