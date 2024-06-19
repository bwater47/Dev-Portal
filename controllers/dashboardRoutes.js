// These variables will import the necessary modules, and use endpoint /dashboard route.
const router = require('express').Router();
const { Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to get the dashboard.
router.get('/', withAuth, async (req, res) => {
  try {
    // If the user is logged in, the dashboard template is rendered.
    res.render('dashboard', { loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get posts by user
router.get('/posts', withAuth, async (req, res) => {
  try {
    // The post data is found using the findAll method.
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // The post data is serialized and passed to the template.
    const posts = postData.map((post) => post.get({ plain: true }));
    // The post template is rendered with the post data.
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get a specific comment.
router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    // The comment data is found by the primary key of the comment.
    const commentData = await Comment.findByPk(req.params.id);
    // If the comment data is not found, a 404 status is returned.
    if (!commentData) {
      // The comment data is serialized and passed to the template.
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    // The comment data is serialized and passed to the template.
    const comment = commentData.get({ plain: true });
    // The comment template is rendered with the comment data.
    res.render('comment', { comment, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get all comments.
router.get('/comments', withAuth, async (req, res) => {
  try {
    // The comment data is found using the findAll method.
    const commentData = await Comment.findOne({
      where: {
        id: 'user_id',
      },
    });
    // The comment data is serialized and passed to the template.
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    // The comment template is rendered with the comment data.
    res.render('post', {
      loggedIn: req.session.logged_in,
      comment: commentData,
    });
    // The comment data is serialized and passed to the template.
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new comment.
router.post('/comments', withAuth, async (req, res) => {
  try {
    // The new comment is created with the comment_text and post_id from the request body and the user_id from the session.
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // If the new comment is created, a 200 status is returned, otherwise a 400 status is returned.
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to get a new post.
router.get('/posts/new', withAuth, async (req, res) => {
  try {
    // If the user is logged in, the newPost template is rendered.
    const postData = await Post.findOne({
      where: {
        id: 'user_id',
      },
    });
    // The post data is serialized and passed to the template.
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // The newPost template is rendered.
    res.render('newPost', { loggedIn: req.session.logged_in, post: postData });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new post.
router.post('/posts/new', withAuth, async (req, res) => {
  try {
    // The new post is created with the title and content from the request body and the user_id from the session.
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // If the new post is created, a 200 status is returned, otherwise a 400 status is returned.
    res.status(200).json(newPost);
  } catch (err) {
    // If there is an error, the error is logged and a 400 status is returned.
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to get a specific post.
router.get('/posts/editpost/:id', withAuth, async (req, res) => {
  try {
    // The post data is found by the primary key of the post.
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // The post data is serialized and passed to the template.
    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a post.
router.put('/posts/editpost/:id', withAuth, async (req, res) => {
  try {
    // The post data is updated with the title and content from the request body.
    const postData = await Post.update(req.body, {
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
router.delete('/posts/editpost/:id', withAuth, async (req, res) => {
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
    // If the post data is destroyed, a 200 status is returned.
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports the router.
module.exports = router;
