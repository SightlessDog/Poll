const mongoose = require('mongoose');
const Event = require("../models/event");

let events;

Event.find({}, (err, res) => events = res);

exports.showEvents = (req, res) => {
    res.render("Events/events", {events: events});
}