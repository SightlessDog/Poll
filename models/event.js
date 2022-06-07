const mongoose = require("mongoose");
const { Schema } = require("mongoose")


const eventSchema = mongoose.Schema({
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

eventSchema.methods.getOngoingPollInfo = function() {
    return `Title: ${this.title} 
            Description: ${this.description}   
            CreationDate:  ${this.createdDate}
            Participants: ${this.participants}
            Options: ${this.options}
            Closed: ${this.closed}`;
};

eventSchema.methods.findSingleEvents = function() {
    return this.model("Events").find({title: this.title}).exec();
}

eventSchema.virtual("titleDesc")
    .get(function() {
        return `${this.title} - ${this.description}`;
    });
    
module.exports = mongoose.model("Event", eventSchema);
