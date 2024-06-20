const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");

//Reviews Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewcontroller.createReview));

//Delete Review Route   
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.deleteReview));


module.exports=router;