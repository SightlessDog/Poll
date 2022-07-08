const Poll = require("../models/poll");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');

module.exports = {
    showPollPage : (req, res) => {
        let id = req.params.id;
        let msgText = "";
        Poll.findById(id, (err, data) => {
            res.render("SinglePoll/singlePoll", {poll : data, notification : msgText});
        })
    },
    postVote : (req, res) => {
        const currentUser = res.locals.currentUser;
        const id = req.params.id;
        let msgText = "";
        Poll.findById(id).exec().then(re => {
            User.findOne({email: currentUser.email}).exec().then(r => {
                re.options.find(votedOption => votedOption.name === req.body.option ? votedOption.votes += 1 : null);              
                re.save((error, savedDoc) => {                    
                    req.flash(
                        'success', `Thanks for your vote for  ${req.body.option}!`
                    );
                    res.locals.redirect = `/poll/${id}`;
                    res.locals.poll = savedDoc;
                    res.render("SinglePoll/singlePoll", {poll: savedDoc, notification : msgText});              
                    if (error) console.log(error);
                })
            });
        })
    },
    createPoll : (req, res, next) => {
        console.log(req.user)
        const optionsPair = [];
        req.body.options.forEach(option => {
            optionsPair.push({name: option, votes: 0});
        });  
        const createdPoll = new Poll({
            title: req.body.title,
            description: req.body.description,
            createdDate: req.body.date,
            closedDate: req.body.date,
            options : optionsPair,
            participants : [],
            deadline: req.body.deadline,
            closed: false,
            creator: req.user._id
        })
        createdPoll.save((error, savedDoc) => {
            let msgText = ""
            res.render("SinglePoll/singlePoll", {poll : savedDoc, notification : msgText});
            if (error) console.log(error);
        })
    },
    addAdditionalOption : (req, res) => {
        let id = req.params.id;
        let msgText = "";
        let additionalOption = {name: req.body.additionalOption, votes: 0};
        Poll.findById(id).exec().then(re => {
            if (!re.options.includes(additionalOption)) {
                re.options.push(additionalOption);
            }
            re.participants.map(participant => {
                User.findByIdAndUpdate(participant, {
                    "$push" : {"openPolls" : id}
                }).exec()
            })
            re.save((error, savedDoc) => {
                res.render("SinglePoll/singlePoll", {poll : savedDoc, notification : msgText});
                if (error) console.log(error);
            })
        })
    },
    addNewParticipant: (req, res, next) => {
        let id = req.params.id
        let mail = req.body.newParticipant;
        let msg = "";
        User.find({email: mail}).exec().then(re => {
            if (re.length === 0) {
                req.flash("error", `No user found with this mail! ${mail}`);
                res.locals.redirect = `/singlePoll/${id}`;
                next();
            } else {
                Poll.findById(id).exec().then(response => {                    
                    if (response.participants.includes(re[0]._id)) {
                        req.flash("error", `User ${mail} has been already added`);
                        res.locals.redirect = `/singlePoll/${id}`;
                        next();
                    } else {
                        response.participants.push(re[0].id);
                        User.findByIdAndUpdate(re[0].id,  {
                            "$push" : {"openPolls" : id}
                        }).exec().then(() => {
                            req.flash("success", "user added!");
                            response.save((error, savedDoc) => {
                                res.render("SinglePoll/singlePoll", {poll : savedDoc, notification : msg});
                                if (error) console.log(error);
                            });
                        })
                    }
                })
            }
        })
    }, 
    closePoll : (req, res) => {
        //TODO: check if the current user is allowed : only creator can close poll
        let id = req.params.id;
        Poll.findById(id).exec().then(re => {      
            let allVotes = re.options.map((o) => o.votes);           
            let highestVote = getHighestVote(re.options);
            //see if votes are zero or if there is a tie for the highest result
            if(highestVote.votes == 0 || allVotes.filter(vote => vote == highestVote.votes).length > 1){
                let msgText = "There is a tie between options for votes or every vote is zero";          
                res.render("SinglePoll/singlePoll", {poll : re, notification : msgText});
            } else{
                re.closed = true;
                re.participants.map(participant => {
                    User.findByIdAndUpdate(participant, {
                        "$push" : {"openPolls" : id}
                    }).exec()
                })
                re.save((error, savedDoc) => {
                    res.render("SinglePoll/closedPoll", {poll : savedDoc, finalResult : highestVote});
                    if (error) console.log(error);
                })
            }
        })
    },
    showClosedPollPage : (req, res) => {
        let id = req.params.id;
    
        Poll.findById(id).exec().then(re => {
            let allVotes = re.options.map((o) => o.votes);
            let highestVote = getHighestVote(re.options);
            res.render("SinglePoll/closedPoll", {poll : re, finalResult : highestVote});
        }).catch((error) => {
            console.log(error.message);
            return [];
        })
    },
    openPoll : (req, res) => {
        //TODO: check if the current user is allowed : only creator can open poll
        let id = req.params.id;
        let msgText = "";
        Poll.findById(id).exec().then(re => {  
            re.closed = false;
            re.save((error, savedDoc) => {
                res.render("SinglePoll/singlePoll", {poll : savedDoc, notification : msgText});
                if (error) console.log(error);
            })
        })
    },
    showEditPage : (req, res) => {
        let id = req.params.id;
        Poll.findById(id).exec().then(re => {
            //console.log(re)
            res.render("SinglePoll/editPoll", {poll: re, deadline: re.deadline.getFullYear() + "-" + (re.deadline.getMonth() >= 10 ? re.deadline.getMonth() + 1 : "0"+(re.deadline.getMonth() + 1))
             + "-" + (re.deadline.getDate() >= 10 ? re.deadline.getDate() : "0" +(re.deadline.getDate()))})
        })
    },
    updatePoll : (req, res, next) => {
        let id = req.params.id;
        let optionsPair = [];
        let msgText = "";

        Poll.findById(id).then(poll => {
            for (let i = 0; i<req.body.options.length; i++ ) {
                if (req.body.options[i] === poll.options[i].name) {
                    optionsPair.push({name: poll.options[i].name, votes: poll.options[i].votes});
                } else {
                    optionsPair.push({name: req.body.options[i], votes: 0});
                }
            }
            let pollParams = {
                title: req.body.title,
                description: req.body.description,
                deadline: req.body.deadline,
                options : optionsPair,
            } 
            poll.participants.map(participant => {
                User.findByIdAndUpdate(participant, {
                    "$push" : {"openPolls" : id}
                }).exec()
            })
            Poll.findByIdAndUpdate(id, {
                $set: pollParams
            }).then(poll => {
                res.locals.redirect = `/poll/${id}`;
                res.locals.poll = poll;
                Poll.findById(id).then(newPoll => {
                    res.render("SinglePoll/singlePoll", {poll: newPoll, notification : msgText});
                })
            })
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    deletePoll: (req, res, next) => {
        let id = req.params.id;
        Poll.findByIdAndRemove(id)
            .then(() => {
                console.log(`Deleted poll: ${id}`);
                res.locals.redirect = "/polls";
                next();
            })
            .catch(error => {
                console.log(`Error deleting poll by ID: ${error.message}`);
                next();
            });
    }
}

function getHighestVote(votes) {
    return highestVote = votes.reduce((currentOption, highest) => currentOption.votes > highest.votes ? currentOption : highest);
}