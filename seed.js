const mongoose = require("mongoose");
Events = require("./models/event");
Users = require("./models/user");


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
        password: "pass123456",
        events: []
    },
    {
        email: "mrschmoke@poller.com",
        password: "pass123456",
        events: []
    },
    {
        email: "mymayu1@poller.com",
        password: "pass123456",
        events: []
    },
    {
        email: "karmagedon@poller.com",
        password: "pass123456",
        events: []
    },
    {
        email: "shirokonto@poller.com",
        password: "pass123456",
        events: []
    }
];

Events.deleteMany().exec()
    .then(() => console.log("Events data is empty!"));

Users.deleteMany().exec()
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

Promise.all(commands).then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
}).catch(error => {
    console.log(`ERROR: ${error}`);
})

//ENTER: 'node seed.js' in console!