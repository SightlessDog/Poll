const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    // name:{
    //     first:{
    //         type: String,
    //         trim:true,
    //         required: true           // will be needed later
    //     },
    //     last:{
    //         type: String,
    //         trim:true,
    //         required: true
    //     }
    // },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }  
});

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);