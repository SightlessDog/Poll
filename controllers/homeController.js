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

exports.sendProfileId = (req, res) => {
    let userId = req.params.userId;
    //Set id for profile
    res.send("Profile of " + userId);
}

exports.sendUploadPhotos = (req, res) => {
    let uploadPhotos = req.params.uploadPhotos;
    //set id for uploading photos
    res.send("Photos: " + uploadPhotos);
}