const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    participants: Number
    //Add options here
})

module.exports = mongoose.model("Event", eventSchema);