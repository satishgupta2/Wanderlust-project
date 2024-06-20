const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");
const listingcontroller=require("../controllers/listings.js")
const multer = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

//index route create route
router.route("/").get( wrapAsync(listingcontroller.index)).post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingcontroller.createListing));;

//Craete a new Route for new listings       
router.get("/new",isLoggedIn,listingcontroller.renderNewFrom);

//show Route Update Route delete route
router.route("/:id").get(wrapAsync(listingcontroller.showListing)).put(isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting, wrapAsync(listingcontroller.updateListing)).delete(isLoggedIn,isOwner,wrapAsync(listingcontroller.deleteListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingcontroller.renderEditform));

module.exports=router;