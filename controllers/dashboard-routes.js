const router = require('express').Router();
const { Post } = require('../models/');
// TODO: Go to '../utils/auth' and complete middleware function
const withAuth = require('../utils/auth');

// /dashboard routes

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {userId: req.session.user_id}
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {posts, logged_in: req.session.logged_in, layout: 'dashboard'})
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const singlePostData = await Post.findByPk(req.params.id);

    const post = singlePostData.get({ plain: true })

    res.render('edit-post', {post, layout: 'dashboard'})

  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
