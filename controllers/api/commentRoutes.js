const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// these will use the endpoint of /api/comments

// Route to create a new comment associated with a specific post
router.post('/newComment', withAuth, async (req, res) => {
  try {
    // Create a new comment with the post ID attached
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.body.post_id,
      user_id: req.session.user_id, // Assuming you want to associate the comment with the logged-in user
    });
    // Send the new serialized comment back as a JSON response
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
