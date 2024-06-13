const router = require('express').Router();
const { Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

// route to get the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', { loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get all comments
router.get('/comments/new', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: 'user_id',
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.render('newComment', {
      loggedIn: req.session.logged_in,
      comment: commentData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// route to create a new comment
router.post('/comments/new', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Line 24-26: The comment is deleted if the user_id matches the session's user_id
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        // Line 28: The user_id is set to the session's user_id
        user_id: req.session.user_id,
      },
    });
    // Line 30-34: If the comment is not found, a 404 status is returned, otherwise the comment is deleted and a 200 status is returned
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    // Line 37: The comment is serialized and sent back as a JSON response
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a new post
router.get('/posts/new', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: 'user_id',
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.render('newPost', { loggedIn: req.session.logged_in, post: postData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// route to create a new post
router.post('/posts/new', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// route to get a specific post
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to update a post
router.put('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to delete a post
router.delete('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
