const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a Schema
const userSchema = new Schema({
    email: {
        type:String, unique: true, required:true},
    password: {type:String, required:true}
});

//Create a model
User = mongoose.model("User", userSchema);

//Export the model
module.exports = User;