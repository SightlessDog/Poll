const homeController = require("./controllers/homeController");
const eventsController = require("./controllers/eventsController");
const eventController = require("./controllers/eventController");
const votedEventsController = require("./controllers/votedEventsController");
const thanksController = require("./controllers/thanksController");
const signUpController = require("./controllers/signUpController");
const errorController = require("./controllers/errorController")
const express = require('express');
const layouts = require("express-ejs-layouts")
const app = express();
const mongoose = require("mongoose");
const Event = require("./models/event");

mongoose.connect(
 "mongodb://localhost:27017/mongodb-poll",
 );
 {useNewUrlParser: true}
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const eventOne = new Event({
    title: "Whatever",
    date: "12.10.2022",
    onlineVotes: 22,
    presenceVotes: 1
})

eventOne.save((error, savedDoc) => {
    if (error) console.log(error);
})

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

app.get("/events/:id", eventController.showEventPage)

app.post("/events/:id", eventController.postVote)

//create a new event
app.post("/event/:id", eventController.createEvent)

app.get("/events", eventsController.showEvents)

app.get("/signup", signUpController.showSignUp);

app.get("/votedEvents", votedEventsController.showVotedEvents)

app.post("/signup", thanksController.showThanks)
// Post a new event
// We will use the same controller for the moment, but later when we have logic this will change 
// TODO I am not sure about this, usually you do a post request and then you get the id back but we'll see :)
app.post("/id/:id", homeController.sendEventId)

//Get profile by userId
app.get("/profile/:userId", homeController.sendProfileId);

// Post userId
app.post("/profile/:userId", homeController.sendProfileId);

app.use(errorController.respondNoResourceFound)
app.use(errorController.respondInternalError)

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening
    ➥ on port number: ${app.get("port")}`)
}); 