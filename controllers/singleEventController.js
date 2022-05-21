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
    let updateOptions;     
    let user;
    const event = Event.findById(id).exec()
    .then(re => 
        updateOptions = re.options
    )
    .then(r => updateOptions.find(el => el.name === req.body.option ? el.votes += 1 : null))
    .then(User.findOne({
        email: "jon@jonwexler.com",
    }).exec()
        .then(r => user =  r) 
        .then(e => Event.findByIdAndUpdate(id, {participants: [user], options: updateOptions}).exec()
        .then(e => Event.find({})
        .exec()
            .then((events) =>{        
            res.render("Events/events", {  
            events: events
            });                   
        }))
    )
    )
}

//used for the creation of the event
exports.createEvent = (req, res, next) => {
    const createdEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        options : [{name: req.body.options[0], votes: 0},{name: req.body.options[1], votes: 0}],
    })
    createdEvent.save((error, savedDoc) => {
        res.render("SingleEvent/singleEvent", {event : savedDoc});
        if (error) console.log(error);
    })
}