// Line 2-3: Import the necessary modules
const router = require('express').Router();
const { Post, Users } = require('../models');
// Line 5: Create a new router object
router.get('/', async (req, res) => {
  // Line 7: Try catch block to catch errors
  try {
    // Line 9: Find all posts and include the user that posted the comment
    const allPosts = await Post.findAll({
      include: [Users],
    });
    // Line 12: Map over the posts and serialize them
    const postArray = allPosts.map((post) => post.get({ plain: true }));
    console.log(postArray);
    // Line 15: Render the homepage template and pass the serialized posts into the template
    res.render('homepage', { postArray, loggedIn: req.session.logged_in});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // Line 7: Try catch block to catch errors
  try {
    // Render the homepage template and pass the serialized posts into the template
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Add code here to handle the login request
    const { email, password } = req.body;
    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Find the user with the provided email
    const user = await Users.findOne({ where: { email } });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the password is correct
    const passwordMatch = await user.checkPassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    // Set the user's session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ message: 'Login successful' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  // Line 7: Try catch block to catch errors
  try {
    // Render the homepage template and pass the serialized posts into the template
    res.render('signup');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/logout', async (req, res) => {
  // Line 7: Try catch block to catch errors
  try {
    // Render the logout template
    res.render('logout');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
