const mongoose = require("mongoose"),
      Event = require("./models/event");
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
    participants: 0,
    options: ["Why yes!", "How about no?"]
}).then(event => {
    testEvent = event;
    return Event.findOne({
        title: event.title
    });
}).then(event => {  testEvent = event
                        testEvent.save().then(event => console.log("event updated"));
})
.catch(error => console.log(error.message));    



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
         console.log(`Created Event: ${event.getInfo()}`);
     })
     .then(() => {
         return Event.findOne( {
             title: "REPLVote"
         });
     })
     .then(event => {
         testEvent = event;
         console.log(`Found one event: ${event.getInfo()}`);
     });
      */