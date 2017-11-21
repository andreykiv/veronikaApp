var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// root route
router.get("/", function(req, res){
    res.render("landing");
});

// register form route
router.get("/register", function(req, res){
    res.render("register");
});

// handle sign-up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err.message);
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Вітаємо на уроці " + user.username + "!");
            res.redirect("/lessons");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/lessons",
        failureRedirect:"/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "До наступної зустрічі!");
    res.redirect("/lessons");
});


module.exports = router;