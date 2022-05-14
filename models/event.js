const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
    title: String,
    date: String,
    optionOne: String,
    optionTwo: String
})

module.exports = mongoose.model("Event", eventSchema);