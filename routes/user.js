const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const Usercontroller=require("../controllers/user.js");

//singup
router.route("/signup").get(Usercontroller.rendersingupForm).post(wrapAsync(Usercontroller.signup));

//login
router.route("/login").get(Usercontroller.renderloginForm).post(saveRedirectUrl,
    passport.authenticate("local",
    {failureRedirect:'/login',
    failureFlash: true
}),Usercontroller.login
   );

//logout   
router.get("/logout",Usercontroller.logout)


module.exports=router;
