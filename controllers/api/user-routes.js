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
    // saves user id, username, login status to session
    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.logged_in = true;
    // saves updates to session and sends response
    req.session.save(() => {
      res.status(200).json(newUser.username)
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// logs user in 
router.post('/login', async (req, res) => {
  try {
    // locate user based on username as entered in login page
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // if user can't be found, return error
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    // run check password function from User model to ensure password matches
    const validPassword = user.checkPassword(req.body.password);
    // if password isn't true, respond with error and return
    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    // update session with username, id, and logged-in status
    req.session.username = user.username;
    req.session.logged_in = true;
    req.session.user_id = user.id;
    req.session.save(() => res.json({ user, message: 'You are now logged in!' }))

  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

// logs user out by destroying session
router.post('/logout', (req, res) => {
  console.log(req.session)
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Test route used to test session updates
// router.post('/test', (req, res) => {
//   console.log(req.session)
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
    // req.session.save(() => {
    //   req.session.username = "Dracula"
    //   console.log(req.session.username)
    // }
      
    // )
// });


module.exports = router;
