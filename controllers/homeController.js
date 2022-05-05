var events = [
    {
    title: "Mathe",
    date: "12.10.2022",
    onlineVotes: 12, 
    presenceVotes: 10
    },
    {
    title: "Info",
    date: "12.10.2022", 
    onlineVotes: 12, 
    presenceVotes: 10
    },
    {
    title: "Fußball",
    date: "12.10.2022",
    onlineVotes: 12, 
    presenceVotes: 10
    }
];

var votedEvents = [
    {
    title: "Choose a game",
    date: "22.01.2023",
    totalVotes: 5, 
    finalResult: "Monkey Island"
    },
    {
    title: "Volleyball Day",
    date: "22.01.2022",
    totalVotes: 10, 
    finalResult: "05.04.2022"
    }
];

exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

exports.sendEventId = (req, res) => {
    let id = req.params.id;
    res.render("/Profile/profile", {name: id});
};

exports.sendProfileId = (req, res) => {
    let userId = req.params.userId;
    //Set id for profile
    res.render("Profile/profile", {name: userId});
}

exports.showEvents = (req, res) => {
    res.render("Events/events", {events: events});
}

exports.showSignUp = (req, res) => {
    res.render("SignUp/signUp");
};

exports.showVotedEvents = (req, res) => {
    res.render("VotedEvents/votedEvents", {votedEvents : votedEvents});
};

exports.showThanks = (req, res) => {
    res.render("Thanks/thanks");
}