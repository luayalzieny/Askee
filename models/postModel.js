const Sequelize=require('sequelize');
const sequelize=require('../util/mySqlDb');


//Schema Creation
const Post=sequelize.define('post',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    
    title:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
        min:4,max:100
    },    
    
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        min:3,
    },
    
    
})

// User.pre('save',async function(next){
//     this.password=await bcrypt.hash(this.password,10)
//     next()
//     })

module.exports=Post;