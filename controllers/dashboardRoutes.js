const router = require('express').Router();
const { Comment, Post } = require('../models');
const withAuth = require('../utils/auth');
// These endpoints will use the /dashboard route

// route to get the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', { loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get posts by user
router.get('/posts', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get a specific comment
router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    const comment = commentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get all comments
router.get('/comments', withAuth, async (req, res) => {
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
    res.render('post', {
      loggedIn: req.session.logged_in,
      comment: commentData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// route to create a new comment
router.post('/comments', withAuth, async (req, res) => {
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
router.get('/posts/editpost/:id', withAuth, async (req, res) => {
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
router.put('/posts/editpost/:id', withAuth, async (req, res) => {
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
router.delete('/posts/editpost/:id', withAuth, async (req, res) => {
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
