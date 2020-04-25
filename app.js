var express = require("express");
var app = express();
var mongoose = require("mongoose");
var seedDB = require("./seeds.js");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/Yelp_camp", {useNewUrlParser: true,  useUnifiedTopology: true});
//bodyparser helps in retrieving the data from the form(builds the req.body object, later it can be used to pick the form data)
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//This is used to add some starter data directly to server. Thus the name Seed.
seedDB();

//GETTING THE MODEL FROM OTHER FILES INSIDE MODELS FOLDER.(THIS INCREASES REUSABILITY AND MINIMIZES THE APP.JS FILE) 
var Campground = require("./models/campgroundSchema.js");
var Comment = require("./models/comments.js");

//==========================
//      CAMPGROUND ROUTES
//==========================

//ROOT ROUTE
app.get("/",function(req,res){

    res.render("home.ejs");

});

//INDEX ROUTE
app.get("/campgrounds",function(req,res){
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
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new.ejs");
});

//CREATE ROUTE
app.post("/campgrounds", function(req,res){

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
app.get("/campgrounds/:id",function(req,res){
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

//============================
//      COMMENTS ROUTES
//============================

//NEW ROUTE

app.get("/campgrounds/:id/comments/new", function(req,res){

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

app.post("/campgrounds/:id/comments", function(req,res){
    
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

//server
app.listen(3000,function(){
    console.log("yelpcamp served!");
});
