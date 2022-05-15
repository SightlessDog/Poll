const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: String,
    description: String,
    date: Date,    
    optionOne: String,
    optionTwo: String,
    participants: Number
    //Add options as options: [Number, String]
});

module.exports = mongoose.model("Event", eventSchema);