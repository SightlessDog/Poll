const homeController = require("./controllers/homeController");
const eventsController = require("./controllers/eventsController");
const singleEventController = require("./controllers/singleEventController");
const votedEventsController = require("./controllers/votedEventsController");
const userController = require("./controllers/userController");
const errorController = require("./controllers/errorController")
const express = require('express');
const layouts = require("express-ejs-layouts")
const app = express();
const mongoose = require("mongoose");
const event = require("./models/event");
const router = require("./routes/index");
const passport = require("passport");
const User = require("./models/user"); //needed functionality for passport to work
const expressSession = require("express-session");

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

let dburl = "mongodb://127.0.0.1:27017/mongodb-poll"
mongoose.connect(
    dburl,
    {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//example event creation
/* const exampleEvent = new event({
    title: "TestEvent2146",
    description: "Vote for something",
    date: Date.now(),
    options: ["a", "b"],
    participants: 23
})

exampleEvent.save((error, savedDoc) => {
    if (error) console.log(error);
}) */

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

app.post("/events/:id", singleEventController.postVote)

app.post("/events", singleEventController.createEvent)

app.get("/events", eventsController.showEvents)


app.get("/Register", userController.showRegister);
app.get("/Profile", userController.showProfile);


app.get("/votedEvents", votedEventsController.showVotedEvents)

//app.post("/signup", thanksController.showThanks)
// Post a new event
// We will use the same controller for the moment, but later when we have logic this will change 
// TODO I am not sure about this, usually you do a post request and then you get the id back but we'll see :)
app.post("/id/:id", homeController.sendEventId)

//Get profile by userId
app.get("/profile/:userId", homeController.sendProfileId);

// Post userId
app.post("/profile/:userId", homeController.sendProfileId);

app.get("/events/:id", singleEventController.showEventPage)

app.use("/", router);
app.use(errorController.respondNoResourceFound)
app.use(errorController.respondInternalError)

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening
    ➥ on port number: ${app.get("port")}`)
}); 