const router = require('express').Router();
const { User } = require('../../models');

// route to create a new user and create a session for the user using the session middleware
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
    
        res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
    });

// login route to verify user credentials and log the user in
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }
    
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
    
        res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
    });

// logout route to destroy the session and log the user out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
    });

module.exports = router;