const User=require("../models/user.js");
module.exports.rendersingupForm=(req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body; 
        // console.log(sam);
        const newUser=new User({email,username});
        // console.log(newUser);
        let registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
        req.flash("success","welcome to Wanderlust");
        res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderloginForm=(req,res)=>{
    res.render("./users/login.ejs");
}


module.exports.login= async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
   let  redirectUrl=res.locals.redirectUrl ||  "/listings";
//    console.log(redirectUrl);
    res.redirect(redirectUrl); 
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","you are logout out!");
        res.redirect("/listings");
    })
}