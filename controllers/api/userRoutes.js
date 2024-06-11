const router = require('express').Router();
const { Users } = require('../../models');

// Route to get all users and exclude the password column
router.get('/', async (req, res) => {
  try {
    const userData = await Users.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create a new user and create a session for the user using the session middleware
router.post('/', async (req, res) => {
  try {
    // Line 8: The user data is created using the create method
    const userData = await Users.create(req.body);
    // Line 10-12: The user_id and logged_in properties are set on the session object
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // Line 14-15: The user data is sent back as a JSON response
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
