const mongoose = require("mongoose"),
 {Schema} = mongoose,
 userSchema = new Schema({
 name: {
    first: {
        type: String,
        trim: true
    },
    last: {
        type: String,
        trim: true
    }
 },
 email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
 },
 zipCode: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: 99999
 },
 password: {
    type: String,
    required: true
 },
 events: [{type: Schema.Types.ObjectId, ref: "Event"}],
}, {
 timestamps: true
});

userSchema.virtual("fullName")
    .get(function() {
 return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("Second-User", userSchema);