// These variables are for importing the necessary modules, and they will use the endpoint of /api/posts.
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get a new post.
router.get('/new', withAuth, async (req, res) => {
  try {
    // If the user is logged in, the newPost template is rendered.
    res.render('newPost', {
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new post.
router.post('/new', withAuth, async (req, res) => {
  try {
    // The new post is created with the title and content from the request body and the user_id from the session.
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // If the new post is created, a 200 status is returned, otherwise a 400 status is returned.
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get a specific post.
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    // The post data is found by the primary key of the post.
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // The post data is serialized.
    const post = postData.get({ plain: true });
    // The editPost template is rendered with the post data and the logged_in status.
    res.render('editPost', { post, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a post.
router.put('/editpost/:id', withAuth, async (req, res) => {
  try {
    // The post data is updated with the title and content from the request body.
    const postData = await Post.update(req.body, {
      // The post is found by the primary key of the post.
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // If the post data is not found, a 404 status is returned.
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // If the post data is updated, a 200 status is returned.
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a post.
router.delete('/editpost/:id', withAuth, async (req, res) => {
  try {
    // The post data is destroyed by the primary key of the post.
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // If the post data is not found, a 404 status is returned.
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Export the router.
module.exports = router;
