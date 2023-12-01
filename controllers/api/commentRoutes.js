const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// api/comments routes

// Create new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.post_id,
        });

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router