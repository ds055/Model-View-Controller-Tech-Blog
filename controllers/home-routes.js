const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const dateHelper = require('../utils/helpers')


// / routes

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }]
    });

    const posts = postData.map((post) => post.get({ plain: true}));

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

    const singlePost = singlePostData.get({ plain: true});

    res.render('single-post', {
      singlePost,
      loggedIn: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
