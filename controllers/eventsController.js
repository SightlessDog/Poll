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

exports.showEvents = (req, res) => {
    res.render("Events/events", {events: events});
}