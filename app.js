/*jshint esversion: 6 */

const express=require('express');
const app=express();
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');
const path=require('path');
const session=require('express-session');
const Sequelize=require('sequelize')
const SequelizeStore=require('connect-session-sequelize')(session.Store)



const routes=require('./routes/routes');
const sequelizeDb = require('./util/mySqlDb');
const User=require('./models/userModel');
const Post=require('./models/postModel');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var sequelize = new Sequelize("askee", "root", "Mysql_password123", {
  dialect: "mysql",
  storage: "./session.mysql",
});

const store=new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, 
  expiration: 24 * 60 * 60 * 1000 
})

// configure express
let hour=3600000//3600000=hour
app.use(
  session({
    secret: "keyboard cat",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:hour }
  })
);

// store.sync()

//middlewares
// app.use(csrfProtection); 
app.use(flash());

app.use((req,res,next)=>{
  if(!req.session.user){
   return next();
  }
  
  User.findByPk(req.session.user.id)
    .then(user=>{
      req.user=user;
      return next();
    })
    .catch(err=>console.log(err))
})


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;

  // res.locals.csrfToken = req.csrfToken();
 return next();
});  

//routes
app.use(routes);

app.use('/test',(req,res,next)=>{
  req.user.getPosts(req.user.id)
    .then(result=>{
      res.send(result)
    })
    .catch(err=>res.send(err))
})

//associations
Post.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Post);

sequelizeDb.sync()
//  sequelizeDb.sync({force:true})
    .then(result=>{
        
        app.listen(3000,function(){
            console.log('Servers up')
        })
    })
    .catch(err=>{console.log(err)})


