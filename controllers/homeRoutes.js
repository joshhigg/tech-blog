const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// Get all Posts for the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// Get specific post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });
        const post = postData.get({ plain: true });

        res.render('post', {
            post
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// User profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });
        
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in_) {
        res.redirect('/profile');
        return
    }

    res.render('login');
});

module.exports = router;