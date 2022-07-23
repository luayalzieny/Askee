/*jshint esversion:6*/
const path=require('path')
const controller=require('./../controller/controller');
const express=require('express');
const router=express();

router.get('/',controller.getIndex);

router.get('/aboutus',controller.getAboutUs);

router.get('/signup',controller.getSignUp);
router.post('/signup',controller.postSignup);

router.get('/signin',controller.getSignIn);
router.post('/signin',controller.postSignIn);


module.exports=router;