const express = require('express');
const app = express();

exports.showThanks = (req, res) => {
    app.use(express.static('public')); //define static file path
    res.sendFile(__dirname + '/views/Thanks/thanks.ejs');
    res.render("Thanks/thanks");
}
