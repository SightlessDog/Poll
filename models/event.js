const mongoose = require("mongoose");
const { Schema } = require("mongoose")


const eventSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        unique: true,
    },
    description: String,
    date: {
        type: Date, 
        required: true,
    },    
    options: {
        type: [{name: String, votes: Number}],
        required: true,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Event", eventSchema);