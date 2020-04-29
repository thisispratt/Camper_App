var express = require("express");
var router = express.Router();
var Campground = require("../models/campgroundSchema.js");
var Comment = require("../models/comments.js");
var User = require("../models/user.js");
//============================
//      COMMENTS ROUTES
//============================

//NEW ROUTE

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){

    //find the particular campground. and then pass it to the comments-new
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new.ejs", {campground: campground});
        }
    });

    
});

//CREATE ROUTE

router.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){

    //req.user contains the id and username of the user that is logged in.
    
    var newComment = {
        text: req.body.text,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    //extract the form data.
    //find the campground by Id. 
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            
            Comment.create(newComment,function(err,comment){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds");
                }
                else{
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
    
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;