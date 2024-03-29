const router = require('express').Router();
const Comment = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req,res)=> {
    try {
        const newComment = Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment)
    } catch(err){
        res.status(500).json(err);
    };
})

router.delete('/:id', withAuth, async (req, res)=> {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData){
            res.status(400).json({message: 'No Comment Found'})
            return;
        }
        res.status(200).json(commentData);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;