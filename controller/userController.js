const User=require('../models/userModel');
const Post=require('../models/postModel');
const {editValidation}=require('./../util/validation')
let validationError='';

exports.getFeed=(req,res,next)=>{
    res.render('feed.ejs',{
        pageTitle:'Feed'
    
        });
}

exports.getProfile=(req,res,next)=>{
    res.render('myprofile.ejs',{
        pageTitle:'MyProfile'
    
        });
}

exports.getDashboard=(req,res,next)=>{
    res.render('./dashboard/examples/dashboard.ejs',{
        pageTitle:'MyDashboard'
    
        });
}


exports.getUserDashboard=(req,res,next)=>{
    res.render('./dashboard/examples/user.ejs',{
        pageTitle:'MyDashboard',
        user:req.user,
        error:validationError
        });
        validationError='';
}

exports.getTableDashboard=(req,res,next)=>{

    req.user.getPosts(req.user.id)
        .then(result=>{
            
             res.render('./dashboard/examples/table.ejs',{
                pageTitle:'MyDashboard',
                posts: result
                 });
    })
        .catch(err=>console.log(err))
}

exports.getTableDashboard=(req,res,next)=>{

    req.user.getPosts(req.user.id)
        .then(result=>{
            
             res.render('./dashboard/examples/table.ejs',{
                pageTitle:'MyDashboard',
                posts: result
                 });
    })
        .catch(err=>console.log(err))
}

// exports.getQuestion=(req,res,next)=>{
//     const postId=req.params.postId
    
//     req.user.getPosts({where:{id:postId}})
//     .then(result=>{
//             res.render('questiondisplay.ejs',{
//                 pageTitle:result[0].title,
//                 post:result[0]
//             })

//             // res.json()
//         })
//         .catch(err=>console.log(err))   
// }


exports.PostEditProfile=(req,res,next)=>{

    const {error}=editValidation(req.body)
    if(error){
        validationError=error.details[0].message
        return res.redirect('/user')
    }

    User.findByPk(req.user.id)
        .then(user=>{
            console.log(user)
            user.username=req.body.username||user.username;
            user.email=req.body.email||user.email;
            user.firstName=req.body.firstName||user.firstName;
            user.lastName=req.body.lastName||user.lastName;
            user.city=req.body.city||user.city;
            user.country=req.body.country||user.country;
            user.facebookLink=req.body.facebookLink||user.facebookLink;
            user.twitterLink=req.body.twitterLink||user.twitterLink;
            user.gMailLink=req.body.gMailLink||user.gMailLink;
            user.aboutMe=req.body.aboutMe||user.aboutMe;            
            return user.save(err=>console.log(err))      
        })
       
        .then(result=>{return res.redirect('/user')})
        .catch(err=>console.log(err))
    // res.redirect('/user')
}