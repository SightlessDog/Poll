const mongoose = require('mongoose');
const Poll = require("../models/poll");

let polls;

Poll.find({}, (err, res) => polls = res);

const getDate = date => {
    const dateObj = new Date(date);
    const month =
      (dateObj.getUTCMonth() + 1 < 10 ? '0' : '') + (dateObj.getUTCMonth() + 1);
    const day = (dateObj.getUTCDate() < 10 ? '0' : '') + dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    // const hours = (dateObj.getUTCHours() < 10 ? '0' : '') + dateObj.getUTCHours();
    // const minutes =
    //   (dateObj.getUTCMinutes() < 10 ? '0' : '') + dateObj.getUTCMinutes();

    return "Deadline: " + month + '.' + day + '.' + year;
  };

module.exports = {
    showPolls : (req, res) => {
        Poll.find({}).exec()           //return promise from find query
            .then((polls) =>{          //send data to next codeblock
                res.render("Polls/polls", {  
                    polls: polls,
                    getDate
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