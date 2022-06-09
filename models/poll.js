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
        required: true,
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
