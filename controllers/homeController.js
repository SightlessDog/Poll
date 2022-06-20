const express = require('express');
const app = express();

exports.showHome = (req, res) => {
    res.render("index");
}