const router = require('express').Router();
const { Post, Users, Comment } = require('../models');
// These endpoints will use the / route

// Create a get route for the homepage
router.get('/', async (req, res) => {
  // Try catch block to catch errors
  try {
    // Find all posts and include the user that posted the comment
    const allPosts = await Post.findAll({
      include: [Users],
    });
    // Map over the posts and serialize them
    const postArray = allPosts.map((post) => post.get({ plain: true }));
    // Render the homepage template and pass the serialized posts into the template
    res.render('homepage', { postArray, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a get route for the dashboard to display the posts by the logged in user.
router.get('/dashboard', async (req, res) => {
  // Try catch block to catch errors.
  try {
    // Find all posts and include the user that posted the comment.
    const userLogged = await Users.findByPk(req.session.user_id, {});
    const allPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [Users]
    });
    // Map over the userLogged posts and serialize them.
    const postArray = allPosts.map((post) => post.get({ plain: true }));
    // Render the homepage template and pass the serialized posts into the template.
    res.render('dashboard', { postArray, loggedIn: req.session.logged_in, userLogged });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a get route for the signup page.
router.get('/signup', async (req, res) => {
  // Try catch block to catch errors.
  try {
    // Render the homepage template and pass the serialized posts into the template.
    res.render('signup');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a get route for the login page.
router.get('/login', async (req, res) => {
  // Try catch block to catch errors.
  try {
    // Render the homepage template and pass the serialized posts into the template.
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a post route for the login form submission.
router.post('/login', async (req, res) => {
  // Try catch block with async/await to catch errors.
  try {
    // Find the user by the email entered in the login form.
    const userData = await Users.findOne({ where: { email: req.body.email } });
    // If the email is incorrect, redirect the user to the login page.
    if (!userData) {
      res.render('login');
      return;
    }
    // Check the password entered in the login form against the hashed password stored in the database.
    const validPassword = await userData.checkPassword(req.body.password);
    // If the password is incorrect, redirect the user to the login page.
    if (!validPassword) {
      res.render('login');
      return;
    }
    // Save the user_id and logged_in status to the session.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a get route for the logout page.
router.post('/logout', async (req, res) => {
  // Try catch block with async/await to catch errors.
  try {
    // Destroy the session to log the user out.
    req.session.destroy(() => {
      res.redirect('/homepage');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post route for the signup form submission.
router.get('/post/:id', async (req, res) => {
  try {
    // Find the post by the primary key and include the user that posted the comment.
    const postData = await Post.findByPk(req.params.id, {
      include: [Users, { model: Comment, include: [Users] }],
    });
    // If the post is not found, return a 404 status.
    const post = postData.get({ plain: true });
    // Render the post template and pass the serialized post data into the template.
    res.render('post', {
      ...post,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router.
module.exports = router;
