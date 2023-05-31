const sequelize = require('../config/config');

const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// create connection to db
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // creates users from userData json
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // creates sample posts from postData json
  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  // creates sample comments from commentData json
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

// call to run seed method
seedDatabase();
