const router = require('express').Router();
const { Post, Users } = require('../models');
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [Users],
        });
        const postArray = allPosts.map((post) => post.get({ plain: true }));
        console.log(postArray);
        res.render('homepage', { postArray} );
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;