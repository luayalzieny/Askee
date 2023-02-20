const Sequelize=require('sequelize');

const sequelize=new Sequelize(
    'askee',//db name
    'root',//username
    'Mysql_password123',{//password
        dialect:'mysql',
        host:'localhost',//hostname
        port:3306
    }
);

module.exports=sequelize;
