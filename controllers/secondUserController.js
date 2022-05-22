const SecondUser = require("../models/second-user");
module.exports = {
 index: (req, res) => {
    SecondUser.find({})
    .then(users => {
        res.render("users/index", {
        users: users
    })
})
.catch(error => {
    console.log(`Error fetching users: ${error.message}`)
    res.redirect("/");
    });
    }
};