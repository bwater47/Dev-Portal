// Purpose: This file is the entry point for all routes.
// It imports the express router and the api routes and home routes.
const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./homeroutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');
// It then uses the router to use the home routes and api routes. Finally, it exports the router.
router.use('/', homeroutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
module.exports = router;
