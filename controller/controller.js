/*jshint esversion:6*/ 
const bcrypt=require('bcrypt');

exports.getIndex=(req,res,next)=>{
res.render('index.ejs',{
    });
};

exports.getAboutUs=(req,res,next)=>{
    res.render('aboutus.ejs',{
        });
    };

exports.getSignUp=(req,res,next)=>{
    res.render('signup.ejs',{
        });
    };

exports.postSignup=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const repeatPassword=req.body.repeatPassword;
}

exports.getSignIn=(req,res,next)=>{
    res.render('signin.ejs',{
        });
    };

exports.postSignIn=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
}