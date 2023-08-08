const model= require("./user.model")

// this is a db write call 
async function  makeUser(fName, lName, email, password){
     // check if email existss
     const data = await model.find({"account.email":email}) // dose the email exist in the db?
     if(data.length == 0 ){ // no?

          await new model({
               "name.first":fName,
               "name.last":lName,
               "account.email":email,
               "account.password":scramblePassword(password)
          })
          .save()
          .then(()=>{
               console.log("successfully saved user to db")
          })
          .catch(()=>{
               console.log("failed to saved user to db")
          })
          
     }else{
          console.log("email in use")
          return -1
     }
}

//function scramble password
function scramblePassword(password){

     return password;
}

async function getAllUsers(){
     return await model.find({})
          .then((data) => {
               return data;
          })
          .catch(()=>{console.log("No users exist")});
}

async function findByName(first, last){
     return await model.find({"name.first":first, "name.last":last})
     .then((data)=>{
          // console.log("user found!\n"+data)
          return data
     }).catch(()=>{console.log("failed to find user by name and last name")})
}

async function findByEmail(email){
     return await model.findOne({"account.email":email})
     .then((data) => {
          console.log(data)
          return data
     }).catch(() => {console.log("Could not find a user with that email")})
}

async function UpdateUserByFirstLastName(
     find_fName,find_lName,re_fName,re_lName,re_email,re_password,
     ){

     await model.updateOne(
          {"name.first":find_fName, "name.last":find_lName},
          {$set:{
               "name.first":re_fName, "name.last":re_lName,
               "account.email":re_email, "account.password":re_password
          }
     })
     .then(()=>{console.log("updated the user successfully") })
     .catch(()=>{console.log("failed to update user") } )

}

async function deleteUserByFLName(first, last){
     await model.deleteOne(
          {"name.first":first, "name.last":last},
          {justOne:true}
          )
     .then(()=>{console.log("successfully deleted user")} )
     .catch(()=>{console.log("failed to delete user")})
}

async function dumpDB(){
     await model.deleteMany({})
     console.log("dumped the db")
}

module.exports={
     makeUser,
     getAllUsers,
     findByName,
     findByEmail,
     UpdateUserByFirstLastName,
     deleteUserByFLName,
     dumpDB
}