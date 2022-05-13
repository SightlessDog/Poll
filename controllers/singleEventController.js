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