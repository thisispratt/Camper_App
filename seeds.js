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
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        title: "Ranted",
        img: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Blah Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus."
    }

];

function seedDB(){

    Campgrounds.remove({},function(err){
        if(err){
            console.log("error in seedDB" + err);
        }
        else{
            console.log("Removed!");

            // data.forEach(function(campground){
        
            //     Campgrounds.create(campground, function(err,campground){
            //         if(err){
            //             console.log(err);
            //         }
            //         else{
            //             console.log("Campground created!");
            //             Comment.create(
            //                 {
            //                     text: "These grounds are great but I wish there was Internet.",
            //                     author: "homer"
        
            //                 },function(err,comment){
            //                     if(err){
            //                         console.log("error while creating comment!"+ err);
            //                     }
            //                     else{
            //                         console.log("comment created!");
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                     }
            //                 }
            //             ); 
            //         }
            //     });
            // }); 
        }
    });


     

    

}

module.exports = seedDB;