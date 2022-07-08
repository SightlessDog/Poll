const mongoose = require('mongoose');
const Poll = require("../models/poll");
const User = require("../models/user");
const passport = require('passport'); 
const httpStatus = require("http-status-codes");
const {showPolls, filterUserPolls} = require("./pollsController");

const getDate = date => {
    const dateObj = new Date(date);
    const month =
      (dateObj.getUTCMonth() + 1 < 10 ? '0' : '') + (dateObj.getUTCMonth() + 1);
    const day = (dateObj.getUTCDate() < 10 ? '0' : '') + dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return "Deadline: " + month + '.' + day + '.' + year;
  };

module.exports = {
    authenticate: passport.authenticate('local', {
        failureRedirect: '/register/signIn',
        failureFlash: "Failed to login.",
        successRedirect: 'Polls/polls',
        successFlash: "Logged in!"
    }),
    showPolls : (req, res) => {
        Poll.find({}).exec()           //return promise from find query
            .then((polls) =>{          //send data to next codeblock
                res.locals.polls = polls;
                    res.render("Polls/polls", {
                        polls: polls,
                        getDate
                    });
                //serve results from db
            }).catch((error) => {
                console.log(error.message);
                return [];
            })                          //catch rejected errors that are rejected in promise
    },
}