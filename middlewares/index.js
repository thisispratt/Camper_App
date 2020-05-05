var Campground = require("../models/campgroundSchema.js");
var Comment = require("../models/comments.js");


var middlewareObj = {
    isLoggedIn: function(req, res, next){
        
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("errMessage", "Please Login first!");
        res.redirect("/login");
    },
    checkCampgroundOwnership: function(req, res, next){
        
        if(req.isAuthenticated()){

            Campground.findById(req.params.id, function(err, campground){
                if(err){
                    console.log(err);
                    req.flash("errMessage", "Campground not found!");
                    res.redirect("back");
                }
                else{

                    if(campground.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("errMessage", "Not permitted!")
                        res.redirect("back");
                    }
                
                }
            });
        }
        else{
            req.flash("errMessage", "You need to Log-In");
            res.redirect("/login");
        }
    },
    checkCommentOwnership: function(req, res, next){
        
        if(req.isAuthenticated()){

            Comment.findById(req.params.comment_id, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("errMessage", "Not permitted!");
                        res.redirect("back");
                    }
                }
            });
        }
        else{
            req.flash("errMessage", "Login in first!");
            res.redirect("/login");
        }
    }

};

module.exports = middlewareObj;