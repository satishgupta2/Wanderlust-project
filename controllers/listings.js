const Listing=require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapbox=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapbox });

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs", { allListings });
};


module.exports.renderNewFrom=(req, res) => { 
    res.render("./listings/new.ejs");
};


module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for does not exist");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("./listings/show.ejs", { listing });
};

module.exports.createListing=async (req, res, next) => {
 let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};

    newlisting.geometry=response.body.features[0].geometry;
    let savelisting=await newlisting.save();
    // console.log(savelisting);
    req.flash("success","New Listing Created!");
    // console.log(newlisting);
    res.redirect("/listings");
};

module.exports.renderEditform=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for does not exist");
        res.redirect("/listings");
    }
   let originalImageUrl=listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs", { listing,originalImageUrl });
};

module.exports.updateListing=async (req, res) => {

    let { id } = req.params;
   let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if(typeof req.file !=="undefined"){

       let url=req.file.path;
       let filename=req.file.filename;
       listing.image={url,filename};
       await listing.save();
   }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted"); 
    // console.log(deletedlisting);
    res.redirect("/listings");
}