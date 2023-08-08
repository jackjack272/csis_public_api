const router= require('express').Router()
const db= require("./db_connect")
const loanCrud = require('./loan.crud')

//******************         Create    ****************** */
router.post("/newloan/", async (req, res)=>{
     // search for user. 
     const email= (req.body.email)
   
     //loan properties. 
     const type= (req.body.type)
     const name= (req.body.name)
     const amount= (req.body.amount)
     const interest_rate= (req.body.interest_rate)
     const term= (req.body.term)
     const compounding_period= (req.body.compounding_period)
     const expense= req.body.expense

     if(
          email==null|| 
          type== null|| name== null||amount== null|| interest_rate== null||
          term== null|| compounding_period== null|| expense== null
          ){
          res.status(400).json({res:`need to have the following values: fname lname type name amount interest_rate term compounding_period expense ex: { "type":"personal loan","name": "education", "amount": 1500,"interest_rate": 5.4,"term": 12,"compounind_period":3, "expense":true}`
          })
     }else{
          try{
               await db.connect()
               await loanCrud.addLoan(email, 
                    type, expense, name, amount, interest_rate,
                    term, compounding_period)
          }catch(e){
               res.status(400).json({res:"failed to add user to the db" })
          }finally{
               res.status(200).json({res:"sucesfully added loan to user" })
          }
     }
})

//******************         Read    ****************** */
// find all loans
router.get("/loans", async(req, res)=>{
     await db.connect();
     const users = await loanCrud.getAllLoans();
          res.status(200).json({res:users});
})
//find loans by email
router.get("/:email", async(req, res)=>{
     const email=req.params.email
     await db.connect();
     await loanCrud.findLoansByEmail(email)
     .then(async (data) => {
          res.status(200).json(data)
     }).catch(() => {console.log("No loans found")})
})

// find by type 
router.get("/:type/:email", async(req, res)=>{
     const type=req.params.type
     const email=req.params.email
     await db.connect();
     await loanCrud.findByType(type, email)
     .then(async (data) => {
          res.status(200).json(data)
     }).catch(() => {console.log("No loans found")})
})

// find by id 
router.get("/:id", async(req, res)=>{
     const id=req.params.id
     if(id == null){
          res.status(400).json({res:"need loan id"})
     }
     await db.connect()
     await loanCrud.findByID(id)
     .then(async (data) => {
          res.status(200).json(data)
     }).catch(() => {console.log("No loans found")})
})


//******************         update    ****************** */

router.put("/:id", async (req, res) => {
     find_id = req.params.id
     //replace values
     re_expense=req.body.expense
     re_name=req.body.name
     re_amount=req.body.amount
     re_intrate=req.body.interest_rate
     re_term=req.body.term
     re_comp=req.body.compounding_period

     if(find_id ==null||re_expense ==null||re_name==null||re_amount==null
          ||re_intrate==null ||re_term==null ||re_comp==null){
          res.status().json({res:"Need to fill all the fields"})
     }else{

          await db.connect()

          await loanCrud.updateLoan(
               find_id, re_expense, re_name, re_amount, re_intrate, re_term, re_comp
          )
          .then( async ()=>{
               res.status(200).json({res:"Loan updated succesfully"})
          })
          .catch( async ()=>{    
               res.status(400).json({res:"Failed to update loan"} ) 
          })
     }
})

// //******************         delete    ****************** */
router.delete("/:id", async(req, res)=>{
     const loanID =req.params.id
     await db.connect()
     await loanCrud.deleteLoan(loanID)
          .then(() => res.json('Loan deleted.'))
          .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports= router