const mongoose = require("mongoose"),
      Poll = require("./models/poll"),
      User = require("./models/user");


mongoose.connect(
    "mongodb://127.0.0.1:27017/mongodb-poll",
    {useNewUrlParser: true});
    
mongoose.Promise = global.Promise;
    
var testPoll;

Poll.create({
    title: "REPLVote",
    description: "Does it help to learn this lesson?",
    createdDate: Date.now(),
    closedDate: Date.now(),
    participants: [],
    options: 
    [{
        name: "Why yes!",
        votes: 5
    }, 
    {
        name: "How about no?",
        votes: 2
    }],
    closed: false
}).then(poll => {
    testPoll = poll;
    return Poll.findOne({
        title: poll.title
    });
}).then(poll => {  
        testPoll = poll;
        testPoll.save().then(poll => console.log("poll updated"));
    })
.catch(error => console.log(error.message));    

var testUser;

User.create({
    name: {
        first: "Peter",
        last: "Parker"
    },
    email: "peter@spiderman.com",
    password: "$2b$10$O8/5cJUXWBvXudS0z.q.L.tyUCuf4iRBn6X5f.QK6MsLqqR.RryE6"
})
.then(user => testUser = user)
.catch(error => console.log(error.message));

//ENTER: 'node' then '.load repl.js'in console!