const mongoose = require('mongoose');
const Poll = require("../models/poll");
const passport = require('passport'); 

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
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.OK,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },
    showPolls : (req, res) => {
        Poll.find({}).exec()           //return promise from find query
            .then((polls) =>{          //send data to next codeblock
                res.locals.polls = polls;
                if(req.query.format === "json") {
                    res.json(res.locals.polls);
                } else {
                    res.render("Polls/polls", {
                        polls: polls,
                        getDate
                    });
                }//serve results from db
            }).catch((error) => {
                console.log(error.message);
                return [];
            })                          //catch rejected errors that are rejected in promise
    }
}