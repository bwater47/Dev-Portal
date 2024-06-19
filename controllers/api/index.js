// Initiate the router variable and require the necessary modules.
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
// Middleware with the use method to use the userRoutes, postRoutes, and commentRoutes.
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
// Export all of the API routes from /api/index.js.
module.exports = router;
