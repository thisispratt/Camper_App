var express = require("express");
var app = express();

//bodyparser helps in retrieving the data from the form(builds the req.body object, later it can be used to pick the form data)
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//array of objects to hold the data of the campgrounds.
var campgrounds = [
    {title: "Salmon creek", img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Mallon", img: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Ranted", img: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Locali", img: "https://images.unsplash.com/photo-1520095972714-909e91b038e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
    {title: "All nighter", img: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
    {title: "Calen clean", img: "https://images.unsplash.com/photo-1494112142672-801c71472ba5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {title: "Mount Goat", img: "https://images.unsplash.com/photo-1564577160324-112d603f750f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"}
];

//routes
app.get("/",function(req,res){

    res.render("home.ejs");

});

app.get("/campgrounds",function(req,res){

    res.render("campgrounds.ejs",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){

    //get data from the form
    var campgroundName = req.body.campgroundName;
    var campgroundImage = req.body.imageLink;
    
    //add data to campgrounds arrray
    var newCampground = {title: campgroundName, img: campgroundImage};
    campgrounds.push(newCampground);

    //redirecting back to the campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

//server
app.listen(3000,function(){
    console.log("yelpcamp served!");
});