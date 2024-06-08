// Purpose: This file is the entry point for all routes.
// It imports the express router and the api routes and home routes.
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// It then uses the router to use the home routes and api routes. Finally, it exports the router.
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
module.exports = router;
