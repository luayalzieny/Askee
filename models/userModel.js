const Sequelize=require('sequelize');
const sequelize=require('../util/mySqlDb');


//Schema Creation
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
        min:4,max:25
    },    
    
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
        isEmail: true,  
        
    },
    
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        min:3,
        max:20
    },
    
    
    firstName: {
        type:Sequelize.STRING,
        min:3,
        max:20
    },
    lastName: {
        type:Sequelize.STRING,
        min:3,
        max:20
    },
    city: {
        type:Sequelize.STRING,
        allowNull:true,

        
    },
    country: {
        type:Sequelize.STRING,
    },
    facebookLink:{
        type:Sequelize.STRING,
        validate:{
            isUrl:[{
                msg: 'must be a facebook URL.',
                protocols: ['https'],
                require_protocol: true
            }],domainCheck(){
                if(!this.facebookLink.includes("www.facebook.com/")){
                    
                    throw new Error('domain link must be written fully ex(www.facebook.com/janedoe)');
                }
            }
        }
    } ,
    twitterLink: {
        type:Sequelize.STRING,

    },
    gMailLink: {
        type:Sequelize.STRING,

    },
    aboutMe: {
        type:Sequelize.STRING,
        min:2,

        }
},{timestampes:true})

// User.pre('save',async function(next){
//     this.password=await bcrypt.hash(this.password,10)
//     next()
//     })

module.exports=User;