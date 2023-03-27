// import mongoose module
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
//create match schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    pwd: String,
    role: String,
    avatar: String,


});

// module predif plugin
userSchema.plugin(uniqueValidator);

// create match model
const user = mongoose.model("User", userSchema);

// make match exportable
module.exports = user;