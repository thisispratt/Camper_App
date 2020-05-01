var express = require("express");
var router = express.Router();
var Campground = require("../models/campgroundSchema.js");
var middleware = require("../middlewares/index.js");
//==========================
//      CAMPGROUND ROUTES
//==========================

//ROOT ROUTE
router.get("/",function(req,res){

    res.render("home.ejs");

});

//INDEX ROUTE
router.get("/campgrounds",function(req,res){
    
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log("Error occured!" + err);
        }
        else{
            res.render("campgrounds/index.ejs",{campgrounds: allCampgrounds});
        }
    });
});


//NEW ROUTE
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

//CREATE ROUTE
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){

    //get data from the form
    var campgroundName = req.body.campgroundName;
    var campgroundImage = req.body.imageLink;
    var campgroundDescription = req.body.campgroundDescription;
    var authorObject = {
        id: req.user._id,
        username: req.user.username
    };

    //add data to the database.
    var newCampground = {
        title: campgroundName, 
        img: campgroundImage, 
        description: campgroundDescription,
        author: authorObject
    };
   
    Campground.create(
        newCampground,function(err,campground){
        if(err){
            console.log("Error occured"+ err);
        }
        else{
            console.log("value inserted!");
        }
    });

    //redirecting back to the campgrounds page
    res.redirect("/campgrounds");
});

//SHOW ROUTE
router.get("/campgrounds/:id",function(req,res){
    var id = req.params.id;
    //find the campground with this ID
    Campground.findById(id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("Error"+ err);
        }
        else{
            
            res.render("campgrounds/show.ejs",{campground: foundCampground});
        }
    });
    
});

//EDIT ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    //user should be logged in.
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.render("campgrounds/edit.ejs", {campground: campground});
        }
    });
    //else redirect to login form.
    //if logged in find the campground.
    //check if the user id equals campground author id
    //if not redirect back.
    //if yes show the edit page.
    
});

//UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    
    var updatedCampground = {
        title: req.body.campgroundName,
        img: req.body.imageLink,
        description: req.body.campgroundDescription

    }
    Campground.findByIdAndUpdate(req.params.id, updatedCampground, function(err, campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }
         else{
             res.redirect("/campgrounds/"+ campground._id);
         }
    });
});
//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});




module.exports = router;