// Initiate the router
const router = require('express').Router();
// Import the userRoutes
const userRoutes = require('./userRoutes');
// Import the postRoutes
const postRoutes = require('./postRoutes');
// Import the commentRoutes
const commentRoutes = require('./commentRoutes');
// Use the userRoutes
router.use('/users', userRoutes);
// Use the postRoutes
router.use('/posts', postRoutes);
// Use the commentRoutes
router.use('/comments', commentRoutes);

// Export all of the API routes from /api/index.js
module.exports = router;