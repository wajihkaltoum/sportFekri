// import mongoose module
const mongoose = require("mongoose");
//create match schema
const teamSchema = mongoose.Schema({
    teamName : String,
    teamOwner : String,
    teamStadium : String,
    teamFoundation : String,
    
});

// create match model
const team = mongoose.model("Team", teamSchema);

// make match exportable
module.exports = team;