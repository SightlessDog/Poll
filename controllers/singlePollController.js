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
        const id = req.params.id;
        Poll.findById(id).exec().then(re => {
            User.findOne({email: "jon@jonwexler.com"}).exec().then(r => {
                re.options.find(el => el.name === req.body.option ? el.votes += 1 : null);
                if (!re.participants.includes(r._id)) {
                    re.participants.push(r._id);
                }                 
                re.save((error, savedDoc) => {
                    msgText = "Thank you for your vote!"
                    res.render("SinglePoll/singlePoll", {poll : savedDoc, notification : msgText});
                    if (error) console.log(error);
                })
            });
        })
    },
    createPoll : (req, res, next) => {
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
            closed: false
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
            let allOptions = re.options.map((o) => o.name);
            // console.log("allOptions: " + allOptions)

            if (!allOptions.includes(additionalOption.name)) {
                re.options.push(additionalOption);
            }
            re.save((error, savedDoc) => {
                msgText = "This option already exists!"
                res.render("SinglePoll/singlePoll", {poll : savedDoc, notification : msgText});
                if (error) console.log(error);
            })
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
            res.render("SinglePoll/editPoll", {poll: re, date: re.createdDate.getFullYear() + "-" + (re.createdDate.getMonth() >= 10 ? re.createdDate.getMonth() + 1 : "0"+(re.createdDate.getMonth() + 1))
             + "-" + (re.createdDate.getDate() >= 10 ? re.createdDate.getDate() : "0" +(re.createdDate.getDate()))})
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
                date: req.body.date,
                options : optionsPair,
            } 
            Poll.findByIdAndUpdate(id, {
                $set: pollParams
            }).then(e => {
                res.locals.redirect = `/poll/${id}`
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
    },
    deletePollOption: (req, res, next) => {
        let id = req.params.id
        let optionName = req.params.name
        Poll.updateOne({id}, {
            $pull: {
                "options": {
                    "name":  optionName,
                }
            }
        }).then(() => {
            res.locals.redirect = "/polls";
            next();
        }).catch(error => {
            console.log(`Error deleting poll by ID: ${error.message}`);
            next();
        });
    }
}

function getHighestVote(votes) {
    return highestVote = votes.reduce((currentOption, highest) => currentOption.votes > highest.votes ? currentOption : highest);
}