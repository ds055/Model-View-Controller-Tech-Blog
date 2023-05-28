const router = require('express').Router();
const { User } = require('../../models');

// /api/user route

// create new user route
router.post('/', async (req, res) => {
  try {
    // create new user in db
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // saves username and login status to session
    req.session.save(() => {
      req.session.username = newUser.username;
      req.session.logged_in = true;

      // respond with newUser data
      res.status(200).json(newUser.username)
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.username = user.username;
      req.session.logged_in = true;
    })

    res.json({ user, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
