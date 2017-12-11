// JavaScript source code
const models = require("./models");
const express = require("express");
//const flash = require('req-flash');
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser')
const http = require('http');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const port = 3000;
const app = express();

var mongoDB = 'mongodb://127.0.0.1/userdb';
mongoose.connect(mongoDB, { useMongoClient: true });

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    name: 'session-id',
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    store: new FileStore(),
    saveUninitialized: false
})); 

app.post("/register", function (req, res) {
    console.log("form redirected")
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //console.log(req.body);
    //var userName = req.body.user.name;
   // var userPassword = req.body.user.password;
   // var userProfile = req.body.user.profile;
    console.log(req.body);
    uname = req.body.user.name;
    models.User.findOne( { userName:uname }, function (err, result, next) {
        if(result== null){
    models.createUser(req.body.user);
    res.send("registration sucessful!");}else {
        res.send("user already exists either login or register with unique username")
    }
});
});



app.post("/", function (req, res) {
    console.log("form redirected")
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //console.log(req.body);
    //var userName = req.body.user.name;
    //var userPassword = req.body.user.password;
    //var userProfile = req.body.user.profile;
 
        
    models.User.findOne({ userName: req.body.user.name }, function (err, result, next) {
        if (result == null) {
            res.send("invalid user")
        } else {
            var name = result.userName;
            var password = result.password;
            var profile = result.profile;
           
            console.log("database :" + profile);
            if (result.userName == req.body.user.name & result.password == req.body.user.password) {
                if (!req.session.user) {
                    req.session.user = result.userName;
                }
                else {
                    // res.send("already authenticated");
                }
                if (req.body.user.profile == null) {
                    res.send("please select a valid profile");
                }
                else if (req.body.user.profile == result.profile) {
                    res.redirect(result.profile + ".html");
                } else {
                    console.log("invalid profile");
                   
                    res.redirect(result.profile + ".html");
                    //req.flash('successMessage', ' Your entered a wrong profile you have been redirected to  your registered  profile that is  :' + result.profile);
                    console.log("testing successful");
                }

                
            } else {
                res.send("invalid user details! please try again ");
            }
        }
    });
});

app.get('/logout', function (req, res) {
    if (req.session) {
        req.session.destroy();
        res.clearCookie("session-id");
        res.redirect('/LoginForm.html');
    } else {
        var err = new Error("you are not logged in");
        err.status = 403;
        next(err);
    }
});

const server = http.createServer(app);
server.listen(port,
    function () {
        console.log("server started running")
    });

    