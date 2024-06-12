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

router.post('/posts', async (req, res) => {
  // Try catch block to catch errors
  try {
    // Create a new post using the request body
    const newPost = await Post.create(req.body);
    // Send a response indicating that the post was created successfully
    res.status(200).json(newPost);
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
    // If the email is incorrect, redirect the user to the login page
    if (!userData) {
      res.render('login');
      return;
    }
    // Check the password entered in the login form against the hashed password stored in the database
    const validPassword = await userData.checkPassword(req.body.password);
    // If the password is incorrect, redirect the user to the login page
    if (!validPassword) {
      res.render('login');
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
  // Try catch block with async/await to catch errors
  try {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', async (req, res) => {
  // Try catch block with async/await to catch errors
  try {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
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
    res.render('dashboard', { postArray, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
