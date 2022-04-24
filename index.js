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
    res.send("Hello World")
}); 

app.get("/items/:vegetables", homeController.sendReqParam)


app.listen(port, () => {
    console.log(`The Express.js server has started and is listening
    ➥ on port number: ${port}`)
}); 