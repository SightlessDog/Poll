const Event = require("../models/event");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');

exports.showEventPage = (req, res) => {
    let id = req.params.id;
    Event.findById(id, (err, data) => {
        res.render("SingleEvent/singleEvent", {event : data});
    })
};

exports.postVote = (req, res) => {
    const id = req.params.id;
    Event.findById(id).exec().then(re => {
        User.findOne({email: "jon@jonwexler.com"}).exec().then(r => {
            re.options.find(el => el.name === req.body.option ? el.votes += 1 : null);
            if (!re.participants.includes(r._id)) {
                re.participants.push(r._id);
            }                 
            re.save().then(r => res.render("Thanks/thanks"));
        });
    })
}

//used for the creation of the event
exports.createEvent = (req, res, next) => {
    const optionsPair = [];
    req.body.options.forEach(option => {
        optionsPair.push({name: option, votes: 0});
    });  
    const createdEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        createdDate: req.body.date,
        options : optionsPair,
        participants : [],
        closed: false
    })
    createdEvent.save((error, savedDoc) => {
        res.render("SingleEvent/singleEvent", {event : savedDoc});
        if (error) console.log(error);
    })
}

//Add additional option to vote
exports.addAdditionalOption = (req, res) => {
    let id = req.params.id;
    let additionalOption = {name: req.body.additionalOption, votes: 0};
    Event.findById(id).exec().then(re => {
        if (!re.options.includes(additionalOption)) {
            re.options.push(additionalOption);
        }
        re.save((error, savedDoc) => {
            res.render("SingleEvent/singleEvent", {event : savedDoc});
            if (error) console.log(error);
        })
    })
}


//close a poll
exports.closePoll = (req, res) => {
    //TODO: check if the current user is allowed : only creator can close poll
    let id = req.params.id;
    Event.findById(id).exec().then(re => {
        //check if there is a tie for the highest vote
        let allVotes = re.options.map((o) => o.votes),
         highestVote = re.options.reduce((currentOption, highest) => currentOption.votes > highest.votes ? currentOption : highest);
        if(findDuplicates(allVotes) == highestVote.votes){
            //if not: poll cannot be closed
            //say that there is a tie
            console.log("There is a tie between options" + highestVote.votes +  " and name: " + highestVote.name)
            res.render("Thanks/thanks");
        } else{
            //if yes: events.closed is true
            re.closed = true;
            console.log("there is a highest vote: " + highestVote.votes +  " and name: " + highestVote.name)
            re.save((error, savedDoc) => {
                res.render("SingleEvent/singleEvent", {event : savedDoc});
                if (error) console.log(error);
            })
        }
    })
}

function findDuplicates(votes) {
    let duplicates = votes.filter( (vote, index) => 
                index !== votes.indexOf(vote));
        return duplicates;
}
