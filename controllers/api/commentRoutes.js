const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    // create a new comment with the user id attached
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // send the new serialized comment back as a JSON response
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
