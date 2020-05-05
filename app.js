var express         = require("express"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds.js"),
    flash           = require("connect-flash");

var passport        = require("passport"),
    localStrategy   = require("passport-local"),
    expressSession  = require("express-session"),
    methodOverride = require("method-override");
    
var bodyParser      = require("body-parser");

//requiring routes
var campgroundRoutes = require("./routes/campgrounds.js"),
    commentsRoutes   = require("./routes/comments.js"),
    authRoutes       = require("./routes/auth.js");

var app = express();

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(flash());

//bodyparser helps in retrieving the data from the form(builds the req.body object, later it can be used to pick the form data)
app.use(bodyParser.urlencoded({extended: false}));

//====================
//  DATABASE SETUP
//====================
var DATABASEURL = process.env.DATABASEURL || "mongodb://localhost/Yelp_camp";

// mongoose.connect("mongodb://localhost/Yelp_camp", {useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.connect(DATABASEURL, {useNewUrlParser: true,  useUnifiedTopology: true});

//This is used to add some starter data directly to server. Thus the name Seed.
// seedDB();

//GETTING THE MODEL FROM OTHER FILES INSIDE MODELS FOLDER.(THIS INCREASES REUSABILITY AND MINIMIZES THE APP.JS FILE) 
var Campground = require("./models/campgroundSchema.js");
var Comment = require("./models/comments.js");
var User = require("./models/user.js");

//=========================
//PASSPORT CONFIG.
//========================
app.use(expressSession({
    secret: "Quick salt to generate a hash",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    //this would help us to pass req.user to every route.So that it can be used by the navbar. (acts as middleware)
    res.locals.currentUser = req.user;
    res.locals.errMessage = req.flash("errMessage");
    res.locals.successMessage = req.flash("successMessage");

    next();
});

app.use(campgroundRoutes);
app.use(commentsRoutes);
app.use(authRoutes);

//server
app.listen(process.env.PORT || 3000,function(){
    console.log("yelpcamp served!");
});
