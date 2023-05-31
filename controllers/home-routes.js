const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const dateHelper = require('../utils/helpers')

// / routes

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    // find all posts with User names via userId foreign key--returns only the username
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }]
    });
    // translate data to plain
    const posts = postData.map((post) => post.get({ plain: true}));
    // render all-posts page with posts data and logged_in bool from session 
    res.render('all-posts', { 
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    // gets post by id primary key, adds username and associated comments
    const singlePostData = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ["username"]
      }, 
      { 
        model: Comment,
        include: [{model: User, attributes: ["username"]}],
      }]
    })
    // translate data to use in page
    const singlePost = singlePostData.get({ plain: true});
    // render single-post page, passing along above data
    res.render('single-post', {
      singlePost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// renders sign up page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
