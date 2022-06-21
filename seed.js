const mongoose = require("mongoose");
Polls = require("./models/poll");
Users = require("./models/user");


let dburl = "mongodb://127.0.0.1:27017/mongodb-poll"
mongoose.connect(
    dburl,
    {useNewUrlParser: true}
);
mongoose.connection;

var currentDate = new Date();
var sevenDaysLater = currentDate.setDate(currentDate.getDate() + 7);

var ongoingPolls = [
    {
        title: "Whatever",
        description: "Vote for something",
        createdDate: Date.now(),
        closedDate: Date.now(),
        participants: [],
        options: [
            {name: "Yes", votes: 0}, 
            {name: "No", votes: 0}
        ],
        deadline: sevenDaysLater,
        closed: false
    },
    {
        title: "Cinema",
        description: "What movie do you want to see?",
        createdDate: Date.now(),
        closedDate: Date.now(),
        participants: [],
        options: [
            {name: "Batman", votes: 0}, 
            {name: "Spiderman", votes: 0}, 
            {name: "Watchmen", votes: 0}
        ],
        deadline: sevenDaysLater,
        closed: false
    },
    {
        title: "Fruits",
        description: "Best fruit in the world",
        createdDate: Date.now(),
        closedDate: Date.now(),
        participants: [],
        options: [
            {name: "Yes", votes: 0}, 
            {name: "Apple", votes: 0}, 
            {name: "Tomato", votes: 0}, 
            {name: "Strawberry", votes: 0}
        ],
        deadline: sevenDaysLater,
        closed: false
    }
];

var users = [
    {
        email: "sightlessdog@poller.com",
        password: "$2b$10$O8/5cJUXWBvXudS0z.q.L.tyUCuf4iRBn6X5f.QK6MsLqqR.RryE6"  
    },
    {
        email: "mrschmoke@poller.com",
        password: "$2b$10$O8/5cJUXWBvXudS0z.q.L.tyUCuf4iRBn6X5f.QK6MsLqqR.RryE6"       
    },
    {
        email: "mymayu1@poller.com",
        password: "$2b$10$O8/5cJUXWBvXudS0z.q.L.tyUCuf4iRBn6X5f.QK6MsLqqR.RryE6"        
    },
    {
        email: "karmagedon@poller.com",
        password: "$2b$10$O8/5cJUXWBvXudS0z.q.L.tyUCuf4iRBn6X5f.QK6MsLqqR.RryE6"
    },
    {
        email: "shirokonto@poller.com",
        password: "$2b$10$O8/5cJUXWBvXudS0z.q.L.tyUCuf4iRBn6X5f.QK6MsLqqR.RryE6"    
    }
];

var closedPolls = [
    {
        title: "Choose a game",
        description: "Which game should we play?",
        createdDate: Date.now(),
        closedDate: Date.now(),
        participants: [],
        options: [
            {name: "Monkey Island", votes: 8}, 
            {name: "Hollow Knight", votes: 8},
            {name: "Hollow Kniffght", votes: 6}
        ],
        deadline: sevenDaysLater,
        closed: true
    },
    {
        title: "Volleyball Day",
        description: "On which day should we play?",
        createdDate: Date.now(),
        closedDate: Date.now(),
        participants: [],
        options: [
            {name: "Friday", votes: 2}, 
            {name: "Saturday", votes: 3}, 
            {name: "Sunday", votes: 4}
        ],
        deadline: sevenDaysLater,
        closed: true
    }
];

Polls.deleteMany().exec()
    .then(() => console.log("Polls data is empty!"));

Users.deleteMany().exec()
    .then(() => console.log("Users data is empty!"));

var commands = [];

ongoingPolls.forEach((e) => {
    commands.push(Polls.create({
        title: e.title,
        description: e.description,
        createdDate: e.createdDate,
        options: e.options,
        participants: e.participants,
        deadline: e.deadline,
        closed: e.closed
    }));
})

users.forEach((u) => {
    commands.push(Users.create({
        email: u.email,
        password: u.password,
        polls: u.polls
    }));
});

closedPolls.forEach((c) => {
    commands.push(Polls.create({
        title: c.title,
        description: c.description,
        createdDate: c.createdDate,
        closedDate: c.closedDate,
        options: c.options,
        participants: c.participants,
        deadline: c.deadline,
        closed: c.closed
    }));
})

Promise.all(commands).then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
}).catch(error => {
    console.log(`ERROR: ${error}`);
})

//ENTER: 'node seed.js' in console!