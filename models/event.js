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

eventSchema.methods.getInfo = function() {
    return `Title: ${this.title} 
            Description: ${this.description}   
            Date:  ${this.date}
            Participants: ${this.participants}
            Options: ${this.options}`;
};

eventSchema.methods.findSingleEvents = function() {
    return this.model("Events").find({title: this.title}).exec();
}

eventSchema.virtual("titleDesc")
    .get(function() {
        return `${this.title} - ${this.description}`;
    });
    
module.exports = mongoose.model("Event", eventSchema);
