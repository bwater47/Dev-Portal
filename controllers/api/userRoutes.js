const router = require('express').Router();
const { Users } = require('../../models');
// These endpoints will use the /api/users route

// Route to get all users and exclude the password column
router.get('/', async (_, res) => {
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

// route to login a user and create a session for the user
router.post('/login', async (req, res) => {
  try {
    // Line 8: The user data is found using the findOne method
    const userData = await Users.findOne({ where: { email: req.body.email } });
    // Line 10: If the user data does not exist, a 400 status code is sent back to the client
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Line 13: The checkPassword method is called on the user data object to verify the password
    const validPassword = await userData.checkPassword(req.body.password);
    // Line 15: If the password is incorrect, a 400 status code is sent back to the client
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Line 18-20: The user_id and logged_in properties are set on the session object
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // Line 22-23: A 200 status code is sent back to the client along with the user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to logout a user and destroy the session
router.post('/logout', async (req, res) => {
  try {
    // Line 8: The session is destroyed using the destroy method
    req.session.destroy(() => {
      // Line 10: A 204 status code is sent back to the client
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
