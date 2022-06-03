const mongoose = require("mongoose");
Events = require("./models/event");
Users = require("./models/user");
ClosedPolls = require("./models/closedPoll");


let dburl = "mongodb://127.0.0.1:27017/mongodb-poll"
mongoose.connect(
    dburl,
    {useNewUrlParser: true}
);
mongoose.connection;

var votingEvents = [
    {
        title: "Whatever",
        description: "Vote for something",
        date: Date.now(),
        participants: [],
        options: [
            {name: "Yes", votes: 0}, 
            {name: "No", votes: 0}
        ]
    },
    {
        title: "Cinema",
        description: "What movie do you want to see?",
        date: Date.now(),
        participants: [],
        options: [
            {name: "Batman", votes: 0}, 
            {name: "Spiderman", votes: 0}, 
            {name: "Watchmen", votes: 0}
        ]
    },
    {
        title: "Fruits",
        description: "Best fruit in the world",
        date: Date.now(),
        participants: [],
        options: [
            {name: "Yes", votes: 0}, 
            {name: "Apple", votes: 0}, 
            {name: "Tomato", votes: 0}, 
            {name: "Strawberry", votes: 0}
        ]
    }
];

var users = [
    {
        email: "sightlessdog@poller.com",
        password: "pass123456"
    },
    {
        email: "mrschmoke@poller.com",
        password: "pass123456"
    },
    {
        email: "mymayu1@poller.com",
        password: "pass123456"
    },
    {
        email: "karmagedon@poller.com",
        password: "pass123456"
    },
    {
        email: "shirokonto@poller.com",
        password: "pass123456"
    }
];

var closedPolls = [
    {
        title: "Choose a game",
        description: "Which game should we play?",
        createdDate: Date.now(),
        closedDate: Date.now(),
        endResult: {name: "Monkey Island", votes: 8},
        participants: [],
        options: [
            {name: "Monkey Island", votes: 8}, 
            {name: "Hollow Knight", votes: 3}
        ]
    },
    {
        title: "Volleyball Day",
        description: "On which day should we play?",
        createdDate: Date.now(),
        closedDate: Date.now(),
        endResult: {name: "Sunday", votes: 4},
        participants: [],
        options: [
            {name: "Friday", votes: 2}, 
            {name: "Saturday", votes: 3}, 
            {name: "Sunday", votes: 4}
        ]
    }
];

Events.deleteMany().exec()
    .then(() => console.log("Events data is empty!"));

Users.deleteMany().exec()
    .then(() => console.log("Users data is empty!"));

ClosedPolls.deleteMany().exec()
    .then(() => console.log("Users data is empty!"));

var commands = [];

votingEvents.forEach((e) => {
    commands.push(Events.create({
        title: e.title,
        description: e.description,
        date: e.date,
        options: e.options,
        participants: e.participants
    }));
})

users.forEach((u) => {
    commands.push(Users.create({
        email: u.email,
        password: u.password,
        events: u.events
    }));
});

closedPolls.forEach((c) => {
    commands.push(ClosedPolls.create({
        title: c.title,
        description: c.description,
        createdDate: c.createdDate,
        closedDate: c.closedDate,
        endResult: c.endResult,
        options: c.options,
        participants: c.participants
    }));
})

Promise.all(commands).then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
}).catch(error => {
    console.log(`ERROR: ${error}`);
})

//ENTER: 'node seed.js' in console!