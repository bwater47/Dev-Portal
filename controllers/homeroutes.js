// Line 2-3: Import the necessary modules
const router = require('express').Router();
const { Post, Users } = require('../models');
// Line 5: Create a new router object
router.get('/', async (req, res) => {
    // Line 7: Try catch block to catch errors
    try {
        // Line 9: Find all posts and include the user that posted the comment
        const allPosts = await Post.findAll({
            include: [Users],
        });
        // Line 12: Map over the posts and serialize them
        const postArray = allPosts.map((post) => post.get({ plain: true }));
        console.log(postArray);
        res.render('homepage', { postArray} );
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;