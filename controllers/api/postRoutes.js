const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
// these will use the endpoint of /api/posts

// route to get a new post
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newPost', {
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create a new post
router.post('/new', withAuth, async (req, res) => {
  try {
    // Line 24-26: The new post is created with the title and content from the request body and the user_id from the session
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // Line 28-33: If the new post is created, a 200 status is returned, otherwise a 400 status is returned
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get a specific post
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    
    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost', { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to update a post
router.put('/editpost/:id', withAuth, async (req, res) => {
  try {
    // Line 24-27: The post is updated if the user_id matches the session's user_id and the post id matches the id in the request
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // Line 31-36: If the post is not found, a 404 status is returned, otherwise the post is updated and a 200 status is returned
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // Line 37-40: The catch block will return a 500 status if there is an error
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to delete a post
router.delete('/editpost/:id', withAuth, async (req, res) => {
  try {
    // Line 46-51: The post is deleted if the user_id matches the session's user_id
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // Line 53-62: If the post is not found, a 404 status is returned, otherwise the post is deleted and a 200 status is returned then the catch block will return a 500 status if there is an error
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
