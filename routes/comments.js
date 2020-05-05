var express = require("express");
var router = express.Router();
var Campground = require("../models/campgroundSchema.js");
var Comment = require("../models/comments.js");
var User = require("../models/user.js");
var middleware = require("../middlewares/index.js");
//============================
//      COMMENTS ROUTES
//============================

//NEW ROUTE

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){

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

router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req,res){

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
                    req.flash("errMessage", "Something went wrong!");
                    res.redirect("/campgrounds");
                }
                else{
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("successMessage", "You commented just now!");
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
    
});

//EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.render("comments/edit.ejs", {campground_id: req.params.id, comment: comment});
        }
    });
    
});

//UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    var updatedComment = {
        text: req.body.text
    }
    Comment.findByIdAndUpdate(req.params.comment_id, updatedComment, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    }); 
});

//DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            req.flash("errMessage", "Something went wrong!");
            res.redirect("/campgrounds/"+req.params.id);
        }
        else{
            req.flash("successMessage", "You deleted a comment!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});



module.exports = router;