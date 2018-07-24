const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//create a Schema
const userSchema = new Schema({
    email: {
        type:String, unique: true, required:true, lowercase:true},
        password: {type:String, required:true}     
  
});

userSchema.pre('save', async function(next){
    try{
    //Generate a salt
    const salt = await  bcrypt.genSalt(10);
    //Generate a password has(salt+hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    //Re assign hashed version back to the original variable that contained the plain text password
    
    this.password = passwordHash;
    //Call on next middleware
    next();
    }catch(error){
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword){
    try{
        //compare the password
        //note that this.password is the hash password       
        const matchPassword =  await bcrypt.compare(newPassword, this.password); 
        console.log("Match password ", matchPassword);
        return matchPassword; 

    }catch(error){
        throw new Error(error);
    }
}
//Create a model
User = mongoose.model("User", userSchema);

//Export the model
module.exports = User;