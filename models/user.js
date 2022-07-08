const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const randToken = require("rand-token");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  apiToken: {
    type: String
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

userSchema.pre("save", function(next) {
  let user = this;
  if(!user.apiToken) user.apiToken = randToken.generate(16);
  next();
});

module.exports = mongoose.model('User', userSchema);
