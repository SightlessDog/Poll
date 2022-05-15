const mongoose = require("mongoose");
const { options } = require("./routes");
Event = require("./models/event");

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
        participants: 1,
        options: ["Yes", "No"]
    },
    {
        title: "Cinema",
        description: "What movie do you want to see?",
        date: Date.now(),
        participants: 0,
        options: ["Batman", "Spiderman", "Watchmen"]
    },
    {
        title: "Fruits",
        description: "Best fruit in the world",
        date: Date.now(),
        participants: 4,
        options: ["Yes", "Apple", "Tomato", "Strawberry"]
    }
];

Event.deleteMany().exec()
    .then(() => console.log("Events data is empty!"));

var commands = [];

votingEvents.forEach((e) => {
    commands.push(Event.create({
        title: e.title,
        description: e.description,
        date: e.date,
        options: e.options
    }));
});

Promise.all(commands).then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
}).catch(error => {
    console.log(`ERROR: ${error}`);
})

//ENTER: 'node seed.js' in console!