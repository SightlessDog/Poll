const express = require('express');
const app = express();

exports.showProfile = (req, res) => {
    res.render("Profile/profile");
}