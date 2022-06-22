const mongoose = require("mongoose");
const { Schema } = require("mongoose")


const pollSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        unique: true,
    },
    description: String,
    createdDate: {
        type: Date,
    },
    closedDate: {
        type: Date
    },    
    options: {
        type: [{name: String, votes: Number}],
        required: true,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    deadline: {
        type: Date
    },
    closed: {
        type: Boolean,
        required: true
    }
});

pollSchema.methods.getOngoingPollInfo = function() {
    return `Title: ${this.title} 
            Description: ${this.description}   
            CreationDate:  ${this.createdDate}
            Participants: ${this.participants}
            Options: ${this.options}
            Deadline: ${this.deadline}
            Closed: ${this.closed}`;
};

pollSchema.methods.findSinglePolls = function() {
    return this.model("Polls").find({title: this.title}).exec();
}

pollSchema.virtual("titleDesc")
    .get(function() {
        return `${this.title} - ${this.description}`;
    });
    
module.exports = mongoose.model("Poll", pollSchema);
