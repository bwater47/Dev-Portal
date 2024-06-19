// These variables are for importing the necessary modules, and the endpoints will use the /api/users route.
const router = require('express').Router();
const { Users } = require('../../models');

// Route to get all users and exclude the password column.
router.get('/', async (_, res) => {
  try {
    // The user data is found using the findAll method excluding the password column.
    const userData = await Users.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create a new user and create a session for the user using the session middleware.
router.post('/', async (req, res) => {
  try {
    // The user data is created using the create method.
    const userData = await Users.create(req.body);
    // The user_id and logged_in properties are set on the session object.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // The user data is sent back as a JSON response.
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to login a user and create a session for the user.
router.post('/login', async (req, res) => {
  try {
    // The user data is found using the findOne method.
    const userData = await Users.findOne({ where: { email: req.body.email } });
    // If the user data does not exist, a 400 status code is sent back to the client.
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // The checkPassword method is called on the user data object to verify the password.
    const validPassword = await userData.checkPassword(req.body.password);
    // If the password is incorrect, a 400 status code is sent back to the client.
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // The user_id and logged_in properties are set on the session object.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // A 200 status code is sent back to the client along with the user data.
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to logout a user and destroy the session.
router.post('/logout', async (req, res) => {
  try {
    // The session is destroyed using the destroy method.
    req.session.destroy(() => {
      // A 204 status code is sent back to the client.
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports the router.
module.exports = router;
