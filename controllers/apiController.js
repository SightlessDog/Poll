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
        showPollsResponseJSON : (req, res) => {
            Poll.find({}).exec()           //return promise from find query
                .then((polls) =>{          //send data to next codeblock
                    res.locals.polls = polls;
                    res.json(res.locals.polls);
                }).catch((error) => {
                console.log(error.message);
            })                          //catch rejected errors that are rejected in promise
        },
        filterUserPolls: (req, res, next) => {
            User.findOne({email: res.locals.currentUser.email}).exec().then(re => {
                Poll.find({}).exec()
                    .then((polls) => {
                        res.locals.polls = polls.filter(p => re.openPolls.includes(p._id))
                        res.json(res.locals.polls)
                    }).catch((error) => {
                        next(error.message);
                    }) 
            }).catch((error) => {
                next(error.message)
            })
        }, 
        handleNotificationClick: (req, res, next) => {
            User.findByIdAndUpdate(res.locals.currentUser._id, {
                "$pull" : {
                    openPolls : req.params.id
                }
            }, function (err, doc) {
                if (err) {
                    console.log(err)
                }
            })
        }
}