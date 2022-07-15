const errorController = require('./controllers/errorController');
const express = require('express');
const layouts = require('express-ejs-layouts'); //require ejs layout rendering
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/router');
const passport = require('passport');
const User = require('./models/user'); //needed functionality for passport to work
const expressSession = require('express-session');
const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost: ${ app.get("port") }`);
 });
const io = require("socket.io")(server);
require("./controllers/chatController")(io) //no need to store this module in a constant since we won’t be using it further in main.js

app.use(
  expressSession({
    secret: 'secretContract',
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
let dburl = 'mongodb://127.0.0.1:27017/mongodb-poll';
mongoose.connect(dburl, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose!');
});

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//create token 
//app.set("token", process.env.TOKEN || "pollToken");
//app.get("token");
//how page 328?
//let apiToken = $("#apiToken").data("token");

app.use(layouts);
app.use(express.static(__dirname + '/public'));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use('/', router);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.listen(app.get('port'), () => {
  console.log(`The Express.js server has started and is listening
    ➥ on port number: ${app.get('port')}`);
});
