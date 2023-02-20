// const joi=require('@hapi/joi')
const joi=require('joi')

//Register validation
const signUpValid=(data)=>{
   const schema=joi.object({
    username:joi.string()
                .min(3)
                .required(),
    
    email:joi.string()
             .min(6)
             .required()
             .email()
             ,
    
    password:joi.string()
                .min(4)
                .required()
} )

return schema.validate(data) 
}

const signInValid=(data)=>{ //data= req.body 
    const schema=joi.object({    
     email:joi.string()
              .min(6)
              .required()
              .email(),
     
     password:joi.string()
                 .min(4)
                 .required()
 })
 
    return schema.validate(data) 
 
 }

const editValidation=(data)=>{
   const schema=joi.object({

      username:joi.string()
         .min(3)
         .required()
         .messages({
            "string.empty": `Username Must Contain Value`
         }),

      email:joi.string()
         .min(6)
         .required()
         .email()
         .label('Email')
         .messages({
            "string.empty": `Email Must Contain Value`
         }),


      firstName:joi.string().min(3).messages({
         "string.empty": `First Name Must Contain Value`
      }),

      lastName: joi.string()
         .min(3)
         .messages({
            "string.empty": `First Name Must Contain Value`
         }),
   
      city:joi.string().allow('')
         ,

      country: joi.string().allow(''),
      
      facebookLink: joi.string().allow('').label('facebook link').custom((value, helper) => {

         if (!value.includes('www.facebook.com/')) {
             return helper.message("Must be written in full form Ex.www.facebook.com/johndoe")

         } else {
             return true
         }

     }),      
      
      twitterLink:  joi.string().allow('').custom((value, helper) => {

         if (!value.includes('www.twitter.com/')) {
             return helper.message("Must be written in full form Ex.www.twitter.com/johndoe")

         } else {
             return true
         }
     }),      
      
      gMailLink:  joi.string().allow('').custom((value, helper) => {

         if (!value.includes('www.gmail.com/')) {
             return helper.message("Must be written in full form Ex.www.gmail.com/johndoe")

         } else {
             return true
         }
     }),      
      
   
      aboutMe: joi.string().allow('')
      
   })

      return schema.validate(data)
   }
 
 module.exports.signInValid=signInValid
 module.exports.signUpValid=signUpValid
 module.exports.editValidation=editValidation
