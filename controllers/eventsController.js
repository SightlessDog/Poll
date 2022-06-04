const mongoose = require('mongoose');
const Event = require("../models/event");
const ClosedPoll = require("../models/closedPoll");

let events;
let closedPolls;

Event.find({}, (err, res) => events = res);

ClosedPoll.find({}, (err, res) => closedPolls = res);

module.exports = {
    showEvents : (req, res) => {
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
                console.log("Events: Promise complete");
            });

    },
    showClosedPolls : (req, res) => {
        ClosedPoll.find({}).exec()           //return promise from find query
            .then((closedPolls) =>{          //send data to next codeblock
                res.render("Events/events", {  
                    closedPolls: closedPolls
                });                     //serve results from db
            }).catch((error) => {
                console.log(error.message);
                return [];
            })                          //catch rejected errors that are rejected in promise
            .then(() => {
                console.log("Voted Poll: Promise complete");
            });
    }
}