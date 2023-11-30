const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// api/posts routes

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err);
    }
});

// View one post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        if (!postData) {
            // Handle the case where the post is not found
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = postData.get({ plain: true });

        return res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update post
router.put('/:id', async (req, res) => {
    const updatedPost = await Post.update(
        {
            // All the fields you can update and the data attached to the request body.
            title: req.body.title,
            content: req.body.content,
        },
        {
            // Gets a book based on the book_id given in the request parameters
            where: {
                id: req.params.id,
            },
        }
    );

    res.json(updatedPost);
});

// Delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!postData) {
            res.status(404).json({ message: "No post with this ID or Invalid permissions" })
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});




module.exports = router;