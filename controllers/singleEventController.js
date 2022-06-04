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
    //check if the current user is allowed : only creator can close poll
    //check if there is a highest option
        //create array with all votes, search for highest number 

        //if not: poll cannot be closed
        //if yes: a new closedPoll is created and events object is removed from database
    //res.render(events) with closed Poll section or new single event
}
exports.showEditPage = (req, res) => {
    let id = req.params.id;
    Event.findById(id).exec().then(re => {
        console.log(re)
        res.render("SingleEvent/editEvent", {event: re, date: re.createdDate.getFullYear() + "-" + (re.createdDate.getMonth() >= 10 ? re.createdDate.getMonth() + 1 : "0"+(re.createdDate.getMonth() + 1))
         + "-" + (re.createdDate.getDate() >= 10 ? re.createdDate.getDate() : "0" +(re.createdDate.getDate()))})
    })
}

exports.updateEvent = (req, res, next) => {
    let id = req.params.id;
    let optionsPair = [];
    Event.findById(id).then(event => {
        for (let i = 0; i<req.body.options.length; i++ ) {
            if (req.body.options[i] === event.options[i].name) {
                optionsPair.push({name: event.options[i].name, votes: event.options[i].votes});
            } else {
                optionsPair.push({name: req.body.options[i], votes: 0});
            }
        }
        let eventParams = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            options : optionsPair,
        } 
        Event.findByIdAndUpdate(id, {
            $set: eventParams
        }).then(e => {
            res.locals.redirect = `/event/${id}`
            Event.findById(id).then(newEvent => {
                res.render("SingleEvent/singleEvent", {event: newEvent});
            })
        })
    });
}