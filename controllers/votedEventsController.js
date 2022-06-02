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

exports.showVotedEvents = (req, res) => {
    res.render("VotedEvents/votedEvents", {votedEvents : votedEvents});
};