/*jshint esversion: 6 */

const express=require('express');
const app=express();
const csrf = require('csurf');
const flash = require('connect-flash');
const path=require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(csrfProtection);
app.use(flash());
