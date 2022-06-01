const mongoose = require("mongoose");
const { Schema } = require("mongoose")


const closedPollSchema = mongoose.Schema({
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
    endResult: {
        type: {name: String, votes: Number},
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

closedPollSchema.methods.getInfo = function() {
    return `Title: ${this.title} 
            Description: ${this.description}   
            EndResult: ${this.endResult}
            Date:  ${this.date}
            Participants: ${this.participants}
            Options: ${this.options}`;
};

closedPollSchema.methods.findSingleClosedPoll = function() {
    return this.model("ClosedPoll").find({title: this.title}).exec();
}

closedPollSchema.virtual("titleDesc")
    .get(function() {
        return `${this.title} - ${this.description}`;
    });
    
module.exports = mongoose.model("ClosedPoll", closedPollSchema);