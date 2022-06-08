const Event = require("../models/event");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');

module.exports = {
    showEventPage : (req, res) => {
        let id = req.params.id;
        let msgText = "";
        Event.findById(id, (err, data) => {
            res.render("SingleEvent/singleEvent", {event : data, notification : msgText});
        })
    },
    postVote : (req, res) => {
        const id = req.params.id;
        Event.findById(id).exec().then(re => {
            User.findOne({email: "jon@jonwexler.com"}).exec().then(r => {
                re.options.find(el => el.name === req.body.option ? el.votes += 1 : null);
                if (!re.participants.includes(r._id)) {
                    re.participants.push(r._id);
                }                 
                re.save().then(r => res.render("Thanks/thanks"));
            });
        })
    },
    createEvent : (req, res, next) => {
        const optionsPair = [];
        req.body.options.forEach(option => {
            optionsPair.push({name: option, votes: 0});
        });  
        const createdEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            createdDate: req.body.date,
            options : optionsPair,
            participants : [],
            closed: false
        })
        createdEvent.save((error, savedDoc) => {
            let msgText = ""
            res.render("SingleEvent/singleEvent", {event : savedDoc, notification : msgText});
            if (error) console.log(error);
        })
    },
    addAdditionalOption : (req, res) => {
        let id = req.params.id;
        let msgText = "";
        let additionalOption = {name: req.body.additionalOption, votes: 0};
        Event.findById(id).exec().then(re => {
            if (!re.options.includes(additionalOption)) {
                re.options.push(additionalOption);
            }
            re.save((error, savedDoc) => {
                res.render("SingleEvent/singleEvent", {event : savedDoc, notification : msgText});
                if (error) console.log(error);
            })
        })
    },
    closePoll : (req, res) => {
        //TODO: check if the current user is allowed : only creator can close poll
        let id = req.params.id;
        Event.findById(id).exec().then(re => {      
            let allVotes = re.options.map((o) => o.votes);           
            let highestVote = getHighestVote(re.options);
            //see if votes are zero or if there is a tie for the highest result
            if(highestVote.votes == 0 || allVotes.filter(vote => vote == highestVote.votes).length > 1){
                let msgText = "There is a tie between options for votes or every vote is zero";          
                res.render("SingleEvent/singleEvent", {event : re, notification : msgText});
            } else{
                re.closed = true;            
                re.save((error, savedDoc) => {
                    res.render("SingleEvent/closedPoll", {event : savedDoc, finalResult : highestVote});
                    if (error) console.log(error);
                })
            }
        })
    },
    showClosedPollPage : (req, res) => {
        let id = req.params.id;
    
        Event.findById(id).exec().then(re => {
            let allVotes = re.options.map((o) => o.votes);
            let highestVote = getHighestVote(re.options);
            res.render("SingleEvent/closedPoll", {event : re, finalResult : highestVote});
        }).catch((error) => {
            console.log(error.message);
            return [];
        })
    },
    openPoll : (req, res) => {
        //TODO: check if the current user is allowed : only creator can open poll
        let id = req.params.id;
        let msgText = "";
        Event.findById(id).exec().then(re => {  
            re.closed = false;
            re.save((error, savedDoc) => {
                res.render("SingleEvent/singleEvent", {event : savedDoc, notification : msgText});
                    if (error) console.log(error);
            })
        })
    },
    showEditPage : (req, res) => {
        let id = req.params.id;
        Event.findById(id).exec().then(re => {
            console.log(re)
            res.render("SingleEvent/editEvent", {event: re, date: re.createdDate.getFullYear() + "-" + (re.createdDate.getMonth() >= 10 ? re.createdDate.getMonth() + 1 : "0"+(re.createdDate.getMonth() + 1))
             + "-" + (re.createdDate.getDate() >= 10 ? re.createdDate.getDate() : "0" +(re.createdDate.getDate()))})
        })
    },
    updateEvent : (req, res, next) => {
        let id = req.params.id;
        let optionsPair = [];
        let msgText = "";
        Event.findById(id).then(event => {
            for (let i = 0; i<req.body.options.length; i++ ) {
                if (req.body.options[i] === event.options[i].name) {
                    optionsPair.push({name: event.options[i].name, votes: event.options[i].votes});
                } else {
                    optionsPair.push({name: req.body.options[i], votes: 0});
                }
            }
            let eventParams = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                options : optionsPair,
            } 
            Event.findByIdAndUpdate(id, {
                $set: eventParams
            }).then(e => {
                res.locals.redirect = `/event/${id}`
                Event.findById(id).then(newEvent => {
                    res.render("SingleEvent/singleEvent", {event: newEvent, notification : msgText});
                })
            })
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    deleteEvent: (req, res, next) => {
        let id = req.params.id;
        Event.findByIdAndRemove(id)
            .then(() => {
                console.log(`Deleted poll: ${id}`);
                res.locals.redirect = "/events";
                next();
            })
            .catch(error => {
                console.log(`Error deleting event by ID: ${error.message}`);
                next();
            });
    }
}

function getHighestVote(votes) {
    return highestVote = votes.reduce((currentOption, highest) => currentOption.votes > highest.votes ? currentOption : highest);
}