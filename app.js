/*jshint esversion: 6 */

const express=require('express');
const app=express();
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');
const ejs=require('ejs')
const path=require('path');

const routes=require('./routes/routes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(csrfProtection); 
app.use(flash());
app.use(routes);


app.listen(3000,()=>{
    console.log(`askee on`);
})