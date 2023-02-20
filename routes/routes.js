/*jshint esversion:6*/
const path=require('path')
const authController=require('../controller/authController');
const err=require('./../controller/error')
const userController=require('./../controller/userController');
const authChecker=require('./../controller/authChecker');
const questionDisplay=require('./../controller/questionDisplay');
const express=require('express');
const router=express();

router.get('/',authController.getIndex);

router.get('/aboutus',authController.getAboutUs);

router.get('/signup',authController.getSignUp);
router.post('/signup',authController.postSignup);
router.get('/logout', authController.getLogout);

router.get('/signin',authController.getSignIn);
router.post('/signin',authController.postSignIn);

router.get('/questionentry',authController.getQuestionEntry);
router.post('/questionentry',authController.postQuestionEntry);

router.get('/questiondisplay/:postId?',questionDisplay.getQuestion)

router.get('/dashboard',authChecker.isAuthenticated,userController.getDashboard);

router.get('/user',authChecker.isAuthenticated,userController.getUserDashboard);
router.post('/user',authChecker.isAuthenticated,userController.PostEditProfile)

router.get('/table',authChecker.isAuthenticated,userController.getTableDashboard);


router.get('/myprofile',userController.getProfile);

// router.get('/err',err.get404);
module.exports=router;