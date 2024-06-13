// It imports the express router, api routes, home routes, and dashboard routes.
const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./homeroutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');
// It then uses the router to use the home routes and api routes.
router.use('/', homeroutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
// Finally, it exports the router.
module.exports = router;
