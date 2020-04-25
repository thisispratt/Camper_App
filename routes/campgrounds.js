var express = require("express");
var router = express.Router();
var Campground = require("../models/campgroundSchema.js");

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
router.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

//CREATE ROUTE
router.post("/campgrounds", isLoggedIn, function(req,res){

    //get data from the form
    var campgroundName = req.body.campgroundName;
    var campgroundImage = req.body.imageLink;
    var campgroundDescription = req.body.campgroundDescription;
    
    //add data to the database.
    var newCampground = {title: campgroundName, img: campgroundImage, description: campgroundDescription};
   
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


//middleware
function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;