const mongoose = require('mongoose');
const Poll = require("../models/poll");

let polls;

Poll.find({}, (err, res) => polls = res);

module.exports = {
    showPolls : (req, res) => {
        Poll.find({}).exec()           //return promise from find query
            .then((polls) =>{          //send data to next codeblock
                res.render("Polls/polls", {  
                    polls: polls
                });                     //serve results from db
            }).catch((error) => {
                console.log(error.message);
                return [];
            })                          //catch rejected errors that are rejected in promise
            .then(() => {
                console.log("Polls: Promise complete");
            });

    }
}