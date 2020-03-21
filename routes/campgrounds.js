var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//SHOW
router.get("/",function(req,res){
	//res.render("campgrounds",{campgrounds: campgrounds});
	Campground.find({},function(err,allcampgrounds){
		if(err){
		console.log(err);
		}
		else{
		res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
})
});
//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
	//get data from form add to array and then redirect
	var name = req.body.name;
	var price = req.body.price;
	var image =req.body.image;
	var description=req.body.description;
	var author={
		id: req.user._id,
		username:req.user.username
	}
	var newCampground={name: name,price:price,image: image,description: description,author:author};

	//campgrounds.push(newCampground);
	//create new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	});
});
//NEW FORM
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//SHOW PAGE
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show",{fcampground: foundCampground});
		}
	});
	
});
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.CheckCampgroundOwnership,function(req,res){	
		Campground.findById(req.params.id,function(err,foundCampground){
			
				res.render("campgrounds/edit",{campground: foundCampground});			
			
			});
});
//UPDATE 
router.put("/:id",middleware.CheckCampgroundOwnership,function(req,res){
	//find and update

	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.CheckCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;