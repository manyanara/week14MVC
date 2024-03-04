const router = require('express').Router();

const { Post, User } = require('../models');

const withAuth = require('../utils/auth');

// sending get request to homepage, use withAuth middleware to check if req session is logged in or not (will redirect to login)
router.get('/', withAuth, async (req, res) => {
    // renders all post data on hompage and sets req session to logged in, sends post array to homepage handlebars
    try { 
        const postData = await Post.findAll({
            include: [{model: User, attributes: ['name']}],
            attributes: {exclude: ['password']},
            order: [[ 'date', 'ASC']],
        });

        const posts = postData.map((post)=> post.get({plain:true}));
        // 
        res.render('dashboard', {
            posts, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;