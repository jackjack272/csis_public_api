const mongoose = require('mongoose');

const express= require("express");
const bodyParser= require("body-parser");
const app= express();
const cors = require('cors');
const port=process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.options("*");

// app.use(cors({ origin: process.env.url, optionsSuccessStatus: 200 }));
app.use(cors());

const url=process.env.url

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true   }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const crud_user= require("./user.routes");
app.use("/",crud_user);

const crud_loan= require("./loan.routes");
app.use("/",crud_loan);


app.get("*",(req,res)=>{
     res.send("404 page bad request");
})



app.listen(port, ()=>{
     console.log("app in port "+port);
})