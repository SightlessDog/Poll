const mongoose = require('mongoose');
const Event = require("../models/event");

let events;

Event.find({}, (err, res) => events = res);

exports.showEvents = (req, res) => {
    Event.find({}).exec()           //return promise from find query
        .then((events) =>{          //send data to next codeblock
            res.render("Events/events", {  
                events: events
            });                     //serve results from db
        }).catch((error) => {
            console.log(error.message);
            return [];
        })                          //catch rejected errors that are rejected in promise
        .then(() => {
            console.log("promise complete");
        });
};