var express = require("express");
var router = express.Router();
var Campground = require("../models/campgroundSchema.js");
var Comment = require("../models/comments.js");

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
    
    var newComment = {
        text: req.body.text,
        author: req.body.author
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