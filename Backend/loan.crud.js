const loan = require("./loan.model");

async function getAllLoans(){
     return await loan.find({})
          .then((data) => {
               return data;
          })
          .catch(()=>{console.log("No loans exist")});
}

async function addLoan(email, 
     type,expense, loanname, amount, interest_rate,term,
      compounding_period)
      
{
     const loanName = await loan.find({"name": loanname});
     if (loanName.length == 0) {
          await new loan({
               "email":email,
               "type":type,
               "expense":expense,
               "name":loanname,
               "amount":amount,
               "interest_rate":interest_rate,
               "term":term,
               "compounding_period":compounding_period
          })
          .save()
          .then(()=>{
               console.log(`added loan successfully to ${email}`);
          })
          .catch(()=>{
               console.log("error adding loan to user");
          })
     } else {
          console.log("Loan name already exists");
          return -1;
     }
}

async function findByType(type, email){
     return await loan.find({"type":type, "email":email})
     .then((data) => {
          console.log(data)
          return data
     }).catch(() => {console.log("No loans found")})
}

async function findLoansByEmail(email){
     return await loan.find({"email":email})
     .then((data) => {
          console.log(data)
          return data
     }).catch(() => {console.log("No loans found")})
}

async function findByID(id) {
     return await loan.find({"_id":id})
     .then((data) => {
          console.log(data)
          return data
     }).catch(() => {console.log("No loans found")})
}

async function updateLoan(find_id, expense, loanname, amount, intrate, term, comp) {
     const doc = await loan.findById(find_id);
          doc.expense = expense;
          doc.name = loanname;
          doc.amount = amount;
          doc.interest_rate =  intrate;
          doc.term =  term;
          doc.compounding_period = comp;
     await doc.save()
     .then(()=>{console.log("Updated loan successfully")})
     .catch(()=>{console.log("Failed to update loan")})
}

async function deleteLoan(id){
     await loan.deleteOne(
          {"_id":id},
          {justOne:true}
          )
     .then(()=>{console.log("successfully deleted loan")} )
     .catch(()=>{console.log("failed to delete loan")})
}

module.exports={
     getAllLoans,
     addLoan,
     findByID,
     findByType,
     updateLoan,
     deleteLoan,
     findLoansByEmail
}