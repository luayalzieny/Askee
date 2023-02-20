const bcrypt=require('bcrypt');

const User=require('../models/userModel');
const Post=require('../models/postModel');
const {signUpValid,signInValid}=require('../util/validation')
let validationError='';


exports.getIndex=(req,res,next)=>{

res.render('index.ejs',{
    pageTitle:'Home'

    });
};

exports.getAboutUs=(req,res,next)=>{
    res.render('aboutus.ejs',{
        pageTitle:'About Us'

    });
    };

exports.getSignUp=(req,res,next)=>{
    let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
    res.render('signup.ejs',{
        pageTitle:'Sign Up',
        error:validationError,
        errMessage:message
         });

    validationError='';
        
    };

exports.postSignup=(req,res,next)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    // const repeatPassword=req.body.repeatPassword;

    const {error}=signUpValid(req.body)
    if(error){
        validationError=error.details[0].message
        return res.redirect('/signup')
    }
    
    User.findOne({where:{email:email}})
        .then(user=>{
            if(user){
                req.flash('error',`Email already exist,please pick another`)
                return res.redirect('/signup')
            }
            return bcrypt.hash(password,12)
                .then(hashedPassword=>{
                    const user=new User({
                        username:username,
                        email:email,
                        password:hashedPassword,
                        facebookLink:'www.facebook.com/',
                        twitterLink:'www.twitter.com/',
                        gmail:'www.gmail.com/'
                    })
                    return user.save()
                })
                .catch(err=>{console.log(err)})
        })
        .then(user=>{
            console.log(user);
            res.redirect('/')
        })
        .catch(err=>{console.log(err)})
}

exports.getSignIn=(req,res,next)=>{
    let message = req.flash('error');
        if (message.length > 0) {
        message = message[0];
        } else {
        message = null;
        }
    res.render('signin.ejs',{
        pageTitle:'Sign In',
        errMessage:message,
        error:validationError
        });
        validationError='';
    };

exports.postSignIn=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    const {error}=signInValid(req.body)
    if(error){
        validationError=error.details[0].message
        return res.redirect('/signin')
    }

    User.findOne({where:{email:email}})
        .then(user=>{
            if(!user){
                req.flash('error',`Invalid Email `)
                return res.redirect('/signin')
            }
            bcrypt.compare(password,user.password)
                .then(doMatch=>{
                    if(doMatch){
                        req.session.isLoggedIn=true;
                        req.session.user=user;
                        return req.session.save(err=>{
                            if(err)
                             console.log(err);
                            res.redirect('/');
                        })
                    }else{
                    req.flash('error', 'Invalid Password.');
                    res.redirect('/signin');
                    }
                })
                .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))

}


exports.getQuestionEntry=(req,res,next)=>{
    let message = req.flash('error');
        if (message.length > 0) {
        message = message[0];
        } else {
        message = null;
        }
    res.render('questionentry.ejs',{
        pageTitle:'Post A Question',
        errMessage:message,
        error:validationError
        });
        validationError='';
    
}

exports.postQuestionEntry=(req,res,next)=>{
   const title=req.body.title;
   const description=req.body.description;

   

    return req.user.createPost({
        title:title,
        description:description,
        
    })
        .then(result=>res.redirect('/'))
        .catch(err=>console.log(err))
    
    
}


exports.getLogout = (req, res, next) => {
    req.session.destroy((err)=>{
        
      if(err)
        console.log(err)
      res.redirect('/')
    })
    };