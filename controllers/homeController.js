const express = require('express');
const app = express();

module.exports = {
    showHome : (req, res) => {
        res.render("index");
    },
    chat : (req, res) =>{
        res.render("chat");
    }
}