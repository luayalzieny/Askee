const User=require('../models/userModel');
const Post=require('../models/postModel');


exports.getQuestion=(req,res,next)=>{
    
    const postId=req.params.postId
    
    req.user.getPosts({where:{id:postId}})
    .then(result=>{
            res.render('questiondisplay.ejs',{
                pageTitle:result[0].title,
                post:result[0]
            })

            // res.json()
        })
        .catch(err=>console.log(err))

}