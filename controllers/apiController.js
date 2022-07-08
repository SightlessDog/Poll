const httpStatus = require("http-status-codes");
const Poll = require("../models/poll");

module.exports = {
respondJSON: (req, res) => {
    res.json({
        status: httpStatus.OK,
        data: res.locals,
    });
    console.log("jsonrespond");
},
    errorJSON: (error, req, res, next) => {
    let errorObject;
    if(error) {
        errorObject = {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        };
    }
    else {
        errorObject = {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Unknown Error."
        };
    }
    res.json(errorObject);
},
    showPollsResponseJSON : (req, res, next) => {
    Poll.find({}).exec()           //return promise from find query
        .then((polls) =>{          //send data to next codeblock
            res.locals.polls = polls;
            res.json(res.locals.polls);
        }).catch((error) => {
        console.log(error.message);
    })                          //catch rejected errors that are rejected in promise
    },
    filterUserPolls: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        let filteredPolls = [];

        Poll.find({}).exec()           //return promise from find query
            .then((polls) => {          //send data to next codeblock
                console.log("Found polls ", polls);
                console.log("user id ", currentUser._id);
                filteredPolls = polls.filter(poll => poll.participants.includes(currentUser._id));
                res.locals.polls = filteredPolls;
                console.log("Filtered polls ", filteredPolls);
                res.json(res.locals.polls);
            }).catch(e => next(new Error(e.message)));
        },
}