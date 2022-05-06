const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController")
const express = require('express');
const layouts = require("express-ejs-layouts")
const mongoose = require("mongoose");
const router = require("./routes/index");
const app = express();
const passport = require("passport")
const User = require("./models/user"); //needed functionality for passport to work
const expressSession = require("express-session")

app.use(
    expressSession({
        secret: "secretContract",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
let dburl = "mongodb://localhost:27017/Poll";
mongoose.connect( dburl)
    .then(() => { console.log('Connected to MongoDB: %s ', dburl ) })
    .catch((err) => { console.error('MongoDB connection error: %s \n', err); });


app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3000);

app.use(layouts)

app.use(express.static(__dirname + '/public'));

// This is a custom middleware
app.use("/", (req, res, next) => {
    console.log(req.params);
    next();
})

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

// Built in function comes from express package
app.get("/", (req, res) => {
    res.render("index");
}); 

app.get("/events", homeController.showEvents)

app.get("/Register", homeController.showRegister);

app.get("/Profile", homeController.showProfile);

app.get("/votedEvents", homeController.showVotedEvents)

//app.post("/Register", homeController.showThanks)

// Get the event id
app.get("/event/:id", homeController.sendEventId)
// Post a new event
// We will use the same controller for the moment, but later when we have logic this will change 
// TODO I am not sure about this, usually you do a post request and then you get the id back but we'll see :)
app.post("/id/:id", homeController.sendEventId)

//Get profile by userId
app.get("/profile/:userId", homeController.sendProfileId);

// Post userId
app.post("/profile/:userId", homeController.sendProfileId);
app.use("/", router);
app.use(errorController.respondNoResourceFound)
app.use(errorController.respondInternalError)

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening
    ➥ on port number: ${app.get("port")}`)
}); 