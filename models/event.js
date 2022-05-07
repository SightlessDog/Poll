const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
    title: String,
    date: String,
    onlineVotes: Number,
    presenceVotes: Number
})

module.exports = mongoose.model("Event", eventSchema);