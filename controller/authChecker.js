exports.isAuthenticated=(req,res,next)=>{

    if(!req.user)
        {
            res.redirect('/')
        }    
    next();
    
    }
