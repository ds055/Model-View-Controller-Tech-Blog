const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// /dashboard routes

// finds all posts and renders them to dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    // get all posts based on user id
    const postData = await Post.findAll({
      where: {userId: req.session.user_id}
    });
    // get plain data from returned postData
    const posts = postData.map((post) => post.get({ plain: true }));
    // render dashboard page with posts data
    res.render('all-posts-admin', {posts, logged_in: req.session.logged_in, layout: 'dashboard'})
  } catch (err) {
    res.redirect('login');
  }
});

// create a new post route
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// edits post based on post id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // find post by id primary key
    const singlePostData = await Post.findByPk(req.params.id);
    // translate to plain data
    const post = singlePostData.get({ plain: true })
    // render edit-post page with post data
    res.render('edit-post', {post, layout: 'dashboard'})
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
