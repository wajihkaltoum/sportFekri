// import mongoose module
const mongoose = require("mongoose");
//create match schema
const playerSchema = mongoose.Schema({
    name : String,
    age : Number,
    position : String,
    number : Number
    
});

// create match model
const player = mongoose.model("Player", playerSchema);

// make match exportable
module.exports = player;