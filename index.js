const homeController = require("./controllers/homeController");
const express = require('express');
const app = express();
const port = 3000; 

// This is a custom middleware
app.use("/", (req, res, next) => {
    console.log(req.params);
    next();
})

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

// Built in function comes from express package
app.get("/", (req, res) => {
    res.send("This should be the home page, we request all the possible events and we show them here")
}); 

// Get the event id
app.get("/event/:id", homeController.sendId)
// Post a new event
// We will use the same controller for the moment, but later when we have logic this will change 
// TODO I am not sure about this, usually you do a post request and then you get the id back but we'll see :)
app.post("/id/:id", homeController.sendCoordinates)

//Get profile by userId
app.get("/profile/:userId", homeController.sendProfileId);

// Post userId
app.post("/profile/:userId", homeController.sendProfileId);

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening
    ➥ on port number: ${port}`)
}); 