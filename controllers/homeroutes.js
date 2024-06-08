// Line 2-3: Import the necessary modules
const router = require('express').Router();
const { Post, Users } = require('../models');
const withAuth = require('../utils/auth');
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

router.get('/newpost', withAuth, async (req, res) => {
  try {
    res.render('newpost', { loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editpost', { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/viewpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('viewpost', { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/deletepost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('deletepost', { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const user = userData.get({ plain: true });
    res.render('profile', { user, loggedIn: req.session.logged_in });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/editprofile', withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('editprofile', { user, loggedIn: req.session.logged_in });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/deleteprofile', withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('deleteprofile', { user, loggedIn: req.session.logged_in });
  } catch (err) {
    res.redirect('login');
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
