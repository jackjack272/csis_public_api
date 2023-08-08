const mongoose= require('mongoose')

const mongooseSchema= mongoose.Schema({
     "email": String,
     "type":String,
     "expense":Boolean,
     "name":String,
     "amount":Number,
     "interest_rate":Number,
     "term":Number, // in months
     "compounding_period":Number
})
 
module.exports= mongoose.model("loan",mongooseSchema)