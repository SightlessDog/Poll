const Event = require("../models/event");
const { body, validationResult } = require('express-validator');

exports.showEventPage = (req, res) => {
    let id = req.params.id;
    //let event;
    Event.findById(id, (err, data) => {
        res.render("SingleEvent/singleEvent", {event : data});
    })
};

exports.addVoteOption = (req, res) => {
    let id = req.params.id;
    let type = req.params.type;

    Event.findById(id, (req, res) => {
        //add one option?
    })
    
};

exports.postVote = (req, res) => {
    Event.findOneAndUpdate

    res.render("Profile/profile")
}

//used for the creation of the event
exports.createEvent = (req, res, next) => {
    const createdEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        options : req.body.options,
        participants: req.body.participants
    })


    createdEvent.save((error, savedDoc) => {
        if (error) console.log(error);
    })
    res.locals.redirect = "/Events";
    console.log('Successfully created and saved Event!');
    console.log(createdEvent);
    next();
}