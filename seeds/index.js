console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json')
const postData = require('./postData.json')
const commentData = require('./commentData.json')

const seedDatabase = async ()=> {
    await sequelize.sync({force:true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true, // runs hooks for individual insertion
        returning: true, // appends returning model columns to get back defined values
    });

    const posts = await Post.bulkCreate(postData);

    const comments = await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();


