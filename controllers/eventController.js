const Event = require("../models/event");

exports.showEventPage = (req, res) => {
    let id = req.params.id;
    Event.findById(id, (err, data) => {

    })
    res.render("Event/event", {event: event});
};


exports.postVote = (req, res) => {
    Event.findOneAndUpdate

    res.render("Profile/profile")
}