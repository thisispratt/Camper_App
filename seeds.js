var mongoose = require("mongoose");

var Campgrounds = require("./models/campgroundSchema.js");
var Comment = require("./models/comments.js");

var data = [
    {  
        title: "Salmon creek", 
        img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Beautiful Salmon ground, has everything that you need for a perfect camping. Visit this camping site for a thrilling experience."    
    },
    {
        title: "Mallon",
        img: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Blah blah very blah."
    },
    {
        title: "Ranted",
        img: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Blah 2 blah 2 desc 2."
    }

];

function seedDB(){

    Campgrounds.remove({},function(err){
        if(err){
            console.log("error in seedDB" + err);
        }
        else{
            console.log("Removed!");

            data.forEach(function(campground){
        
                Campgrounds.create(campground, function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Campground created!");
                        Comment.create(
                            {
                                text: "These grounds are great but I wish there was Internet.",
                                author: "homer"
        
                            },function(err,comment){
                                if(err){
                                    console.log("error while creating comment!"+ err);
                                }
                                else{
                                    console.log("comment created!");
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                            }
                        ); 
                    }
                });
            }); 
        }
    });


     

    

}

module.exports = seedDB;