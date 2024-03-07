const router = require('express').Router();
const { User }= require('../../models');

//first login route
router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const userData = await User.findOne({ where: {email: req.body.email}});
        if (!userData){ res.status(400).json({message: "Error, no user with this email found"}); 
        return;}

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword){ res.status(400).json({message: "Error, invalid password"});
    return; };
    
        req.session.save(()=>{ 
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({user: userData, message: "You are logged in"});
    });

    }
    catch (err){
        console.log(err)
        res.status(400).json(err);
    }
});
// signup route
router.post('/signup', async (req, res)=> {
    try {
        console.log(req.body);
        const newUser = User.create({name: req.body.name, email: req.body.email, password: req.body.password});

        console.log(newUser);
    } 
    catch (err){}
})

router.post('/logout', (req, res)=> {
    if (req.session.logged_in){
        req.session.destroy(()=> {res.status(204).end();});
    } else { res.status(404).end();}
}); 

module.exports= router;