const Event = require("../models/event");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');

exports.showEventPage = (req, res) => {
    let id = req.params.id;
    Event.findById(id, (err, data) => {
        res.render("SingleEvent/singleEvent", {event : data});
    })
};

exports.postVote = (req, res) => {
    const id = req.params.id;
    let updateOptions;     
    let user;
    const event = Event.findById(id).exec()
    .then(re => 
        updateOptions = re.options
    )
    .then(r => updateOptions.find(el => el.name === req.body.option ? el.votes += 1 : null))
    .then(User.findOne({
        email: "jon@jonwexler.com",
    }).exec()
        .then(r => user =  r) 
        .then(e => Event.findByIdAndUpdate(id, {participants: [user], options: updateOptions}).exec()
        .then(e => Event.find({})
        .exec()
            .then((events) =>{        
                res.render("Thanks/thanks");                   
        }))
    )
    )
}

//used for the creation of the event
exports.createEvent = (req, res, next) => {
    const optionsPair = [];
    req.body.options.forEach(option => {
        optionsPair.push({name: option, votes: 0});
    });  
    const createdEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        options : optionsPair,
        participants : []
    })
    createdEvent.save((error, savedDoc) => {
        res.render("SingleEvent/singleEvent", {event : savedDoc});
        if (error) console.log(error);
    })
}

//Add additional option to vote
exports.addAdditionalOption = (req, res, next) => {
    let id = req.params.id;
    let additionalOption = {name: req.body.additionalOption, votes: 0};
    Event.updateOne(
        {_id: id},
        {$push: {options: additionalOption}},
        function (error, success){
            res.render("Thanks/thanks");
            //res.render("SingleEvent/singleEvent", {event : success});
            if(error) console.log(error)
        }
    );
}