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
exports.createEvent = (req, res) => {
    const createdEvent = new Event({
        title: req.params.title,
        date: req.params.date,
        optionOne: req.params.optionOne,
        optionTwo: req.params.optionTwo
    })
    
    createdEvent.save((error, savedDoc) => {
        if (error) console.log(error);
    })

}