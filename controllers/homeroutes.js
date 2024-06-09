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
    res.render('homepage', { postArray, loggedIn: req.session.logged_in });
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
    const userData = await Users.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
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
