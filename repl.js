const mongoose = require("mongoose"),
      Event = require("./models/event"),
      User = require("./models/user");
const { showVotedEvents } = require("./controllers/votedEventsController");


mongoose.connect(
    "mongodb://127.0.0.1:27017/mongodb-poll",
    {useNewUrlParser: true});
    
mongoose.Promise = global.Promise;
    
var testEvent;

Event.create({
    title: "REPLVote",
    description: "Does it help to learn this lesson?",
    date: Date.now(),
    participants: [],
    options: 
    [{
        name: "Why yes!",
        votes: 5
    }, 
    {
        name: "How about no?",
        votes: 2
    }]
}).then(event => {
    testEvent = event;
    return Event.findOne({
        title: event.title
    });
}).then(event => {  
        testEvent = event;
        testEvent.save().then(event => console.log("event updated"));
    })
.catch(error => console.log(error.message));    

var testUser;

User.create({
    name: {
        first: "Peter",
        last: "Parker"
    },
    email: "peter@spiderman.com",
    password: "spiderpig"
})
.then(user => testUser = user)
.catch(error => console.log(error.message));

//ENTER: 'node' then '.load repl.js'in console!

//console.log(testEvent.title);



//lection 17
/* 
Event.remove({})
     .then((items) => console.log(`Removed ${items.n} records!`))
     .then(() => {
         return Event.remove({});
     })
     .then((items) => console.log(`Removed ${items.n} records!`))
     .then(() => {
         return Event.create({
             title: "REPLVote",
             description: "Does it help to learn this lesson?",
             date: Date.now(),
             participants: 0,
             options: ["Why yes!", "How about no?"]
         }); 
     })
     .then(event => {
         console.log(`Created Event: ${event.getOngoingPollInfo()}`);
     })
     .then(() => {
         return Event.findOne( {
             title: "REPLVote"
         });
     })
     .then(event => {
         testEvent = event;
         console.log(`Found one event: ${event.getOngoingPollInfo()}`);
     });
      */