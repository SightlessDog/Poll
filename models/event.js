const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: String,
    description: String,
    date: Date,    
    participants: Number,
    options: [String]
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
