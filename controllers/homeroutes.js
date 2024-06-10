// Import the necessary modules
const router = require('express').Router();
const { Post, Users } = require('../models');
// Create a new router object
router.get('/', async (req, res) => {
  // Try catch block to catch errors
  try {
    // Find all posts and include the user that posted the comment
    const allPosts = await Post.findAll({
      include: [Users],
    });
    // Map over the posts and serialize them
    const postArray = allPosts.map((post) => post.get({ plain: true }));
    console.log(postArray);
    // Render the homepage template and pass the serialized posts into the template
    res.render('homepage', { postArray, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  // Try catch block to catch errors
  try {
    // Render the homepage template and pass the serialized posts into the template
    res.render('signup');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // Try catch block to catch errors
  try {
    // Render the homepage template and pass the serialized posts into the template
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
// Create a post route for the login form submission
router.post('/login', async (req, res) => {
  // try catch block with async/await to catch errors
  try {
    // Find the user by the email entered in the login form
    const userData = await Users.findOne({ where: { email: req.body.email } });
    // If the email is incorrect, send a message back to the client
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Check the password entered in the login form against the hashed password stored in the database
    const validPassword = await userData.checkPassword(req.body.password);
    // If the password is incorrect, send a message back to the client
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Save the user_id and logged_in status to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/logout', async (req, res) => {
  // Try catch block to catch errors
  try {
    // Render the logout template
    res.render('logout');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
