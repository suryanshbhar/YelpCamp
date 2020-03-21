var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis tempus porta. Donec facilisis tincidunt dui non iaculis. Nam id erat dolor. Ut fermentum, enim auctor sollicitudin sodales, ex nisl facilisis arcu, sed consectetur erat lectus non est. Maecenas et gravida nisl. Ut ultrices diam quis neque consequat, laoreet mattis augue porttitor. Donec vel iaculis nunc. Duis sed iaculis neque. Curabitur congue ornare elit sit amet faucibus. Fusce sit amet facilisis eros.  blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/96/37/ae/getlstd-property-photo.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis tempus porta. Donec facilisis tincidunt dui non iaculis. Nam id erat dolor. Ut fermentum, enim auctor sollicitudin sodales, ex nisl facilisis arcu, sed consectetur erat lectus non est. Maecenas et gravida nisl. Ut ultrices diam quis neque consequat, laoreet mattis augue porttitor. Donec vel iaculis nunc. Duis sed iaculis neque. Curabitur congue ornare elit sit amet faucibus. Fusce sit amet facilisis eros.  blah blah"
    },
    {        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis tempus porta. Donec facilisis tincidunt dui non iaculis. Nam id erat dolor. Ut fermentum, enim auctor sollicitudin sodales, ex nisl facilisis arcu, sed consectetur erat lectus non est. Maecenas et gravida nisl. Ut ultrices diam quis neque consequat, laoreet mattis augue porttitor. Donec vel iaculis nunc. Duis sed iaculis neque. Curabitur congue ornare elit sit amet faucibus. Fusce sit amet facilisis eros.  blah"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author:"Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;