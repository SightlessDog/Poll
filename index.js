const errorController = require("./controllers/errorController"),
      express = require('express'),
      layouts = require("express-ejs-layouts"), //require ejs layout rendering
      app = express(),
      mongoose = require("mongoose"),
      router = require("./routes/router"),
      passport = require("passport"),
      User = require("./models/user"), //needed functionality for passport to work
      expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash");

app.use(cookieParser("secretContract"));
app.use(
    expressSession({
        secret: "secretContract",
        cookie: {
            maxAge: 4000000
        }, 
        resave: false,
        saveUninitialized: false
    })
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
let dburl = "mongodb://127.0.0.1:27017/mongodb-poll"
mongoose.connect(
    dburl,
    {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//TODO REMOVE USER!!
User.create({
    name: {
    first: "Jon",
    last: "Wexler "
    },
    email: "jon@jonwexler.com",
    password: "pass123"
})
.then(user => {
    console.log("User created - remove this user from index.js as soon as we implement user sessions")
})
.catch(error => console.log(error.message + " Remove this user from index.js as soon as we implement user sessions"));

app.set("view engine", "ejs")
app.set("port", process.env.PORT || 3000);
app.use(layouts)
app.use(express.static(__dirname + '/public'));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use("/", router);
app.use(errorController.respondNoResourceFound)
app.use(errorController.respondInternalError)
app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening
    ➥ on port number: ${app.get("port")}`)
}); 