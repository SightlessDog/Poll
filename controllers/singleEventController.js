const Event = require("../models/event");

exports.showEventPage = (req, res) => {
    let id = req.params.id;
    let event;
    Event.findById(id, (err, data) => {
        res.render("SingleEvent/singleEvent", {event : data});
    })
};

exports.postVote = (req, res) => {
    Event.findOneAndUpdate

    res.render("Profile/profile")
}

//used for the creation of the event
exports.createEvent = (req, res, next) => {
    const createdEvent = new Event({
        title: req.params.title,
        description: req.params.description,
        date: req.params.date,
        options : req.params.options,
        participants: req.params.participants
    })
    
    createdEvent.save((error, savedDoc) => {
        if (error) console.log(error);
    })
    res.locals.redirect = "/Events";
    console.log('Successfully created Event!');
    next();
}