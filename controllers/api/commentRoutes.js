const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

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
