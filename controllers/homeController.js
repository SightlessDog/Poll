exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

exports.sendEventId = (req, res) => {
    let lat = req.params.id;
    res.send("Coordinates for the Pin are:" + id);
};

exports.sendProfileId = (req, res) => {
    let userId = req.params.userId;
    //Set id for profile
    res.send("Profile of " + userId);
}