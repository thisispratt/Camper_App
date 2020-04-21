var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Yelp_camp", {useNewUrlParser: true,  useUnifiedTopology: true});
//bodyparser helps in retrieving the data from the form(builds the req.body object, later it can be used to pick the form data)
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//SCHEMA SETUP 
var campgroundSchema = new mongoose.Schema({
    title: String,
    img: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

/* Campground.create(
    {title: "Salmon creek", 
    img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description: "Beautiful Salmon ground, has everything that you need for a perfect camping. Visit this camping site for a thrilling experience."
},
    function(err,campground){
    if(err){
        console.log("ERROR OCCURED!" + err);
    }
    else{
        console.log("VALUE INSERTED");
    }
}); */

//array of objects to hold the data of the campgrounds.
/* var campgrounds = [
    {title: "Salmon creek", img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Mallon", img: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Ranted", img: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Locali", img: "https://images.unsplash.com/photo-1520095972714-909e91b038e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
    {title: "All nighter", img: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
    {title: "Calen clean", img: "https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Mount Goat", img: "https://images.unsplash.com/photo-1564577160324-112d603f750f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"}
]; */

//routes
app.get("/",function(req,res){

    res.render("home.ejs");

});

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log("Error occured!" + err);
        }
        else{
            res.render("index.ejs",{campgrounds: allCampgrounds});
        }
    });
});

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

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    var id = req.params.id;
    //find the campground with this ID
    Campground.findById(id, function(err,foundCampground){
        if(err){
            console.log("Error"+ err);
        }
        else{
            res.render("show.ejs",{campground: foundCampground});
        }
    });
    
});

//server
app.listen(3000,function(){
    console.log("yelpcamp served!");
});
