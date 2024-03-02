const Sequelize= require('sequelize');
require('dotenv').config();  //import and configure dotenv

let sequelize;

//checks if theres a JAWSDB URL already, if not creates a new sequelize connection using dotenv access info and setting a location for the database
if (process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host:'localhost',
            dialect:'mysql',
            port: 3306
        }
    );
}

module.exports= sequelize; 