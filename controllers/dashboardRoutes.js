const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');

// route to get the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', { loggedIn: req.session.logged_in });
  } catch (err) {
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
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newPost', { loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
}
);

module.exports = router;
