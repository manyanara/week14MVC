const router = require('express').Router();

const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

// sending get request to homepage, use withAuth middleware to check if req session is logged in or not (will redirect to login)
router.get('/', withAuth, async (req, res) => {
    console.log(req.body)
    // renders all post data on hompage and sets req session to logged in, sends post array to homepage handlebars
    try { 
        console.log('we are trying')
        const postData = await Post.findAll({
            order: [[ 'date', 'ASC']],
        });

        const posts = postData.map((post)=> post.get({plain:true}));
        // ?
        res.render('homepage', {
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
// route to look up specific post by post id, includes user and comment data
router.get('/posts/ :id', async (req,res)=> {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {model: User, Comment,
                attributes: ['name', 'date']},
            ],
        });
        const post = postData.get({plain: true});
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err){
        res.status(500).json(err);
    }
});
// route to display user profile
router.get('/dashboard', withAuth, async(req, res)=> {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{model: Post}, {model: Comment}],
            attributes: {exclude: ['password']},
        });
        console.log(`this is userdata ${userData}`)
        const user= userData.get({plain: true});
        console.log(`this is user ${user}`);
        res.render('dashboard', {
            ...user,
            logged_in: true
        })
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;