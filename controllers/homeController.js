exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

exports.sendCoordinates = (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;
    // Set id for the pin
    // let id = id.set(); 
    res.send("Coordinates for the Pin are:" + lat + ", " + lon);
};

exports.mapIndex = (req, res) => {
    res.send("This will be the page for the Map");
}