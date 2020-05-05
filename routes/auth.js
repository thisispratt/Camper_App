var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.js");
//==================
//AUTH ROUTES
//==================

//sign-up form
router.get("/register", function(req,res){
    res.render("register.ejs");
});

//handle sign-up logic
router.post("/register", function(req,res){

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err,user){
        if(err){
    
            req.flash("errMessage", err.message);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                req.flash("successMessage", "Welcome! to YelpCamp "+ user.username);
                res.redirect("/campgrounds");
            });
            
        }
    });
});

//login form

router.get("/login", function(req,res){

    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
    
});

//Logout Route

router.get("/logout", function(req,res){
    req.logout();
    req.flash("successMessage", "You Logged out!");
    res.redirect("/campgrounds");

});



module.exports = router;