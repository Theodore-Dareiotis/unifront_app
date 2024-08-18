import express from 'express';
import { isLoggedIn } from '../middleware/authenticationMiddleware.js';
import { getUser } from '../controllers/users.js';

const authRouter = express.Router();

// login
authRouter.post('/login', async (req, res) => {
    if (req.session.user) return res.send("You are already logged in.");

    req.session.regenerate(async (err) => {
        if (err) return next(err);

        const { username, password } = req.body;
        //console.log(`${username} ${password}`);
        //console.log(req.body);


        // querying database
        const user = await getUser(username, password);
        console.log(user);


        if (user) {
            req.session.user = user.username;
            req.session.type = user.user_type;
            //console.log(req.session.user);
            //console.log(req.session.type);
            console.log(`${username} logged in.`);

            req.session.save((err) => {
                if (err) return next(err);

                switch (req.session.type) {
                    case 'user':
                        res.redirect('/citizen');
                        break;
                    case 'rescuer':
                        res.redirect('/rescuer');
                        break;
                    case 'admin':
                        res.redirect('/admin');
                        break;
                }
            });
        } else {
            res.status(401).send('Wrong username and/or password.');
        }


    });

});

authRouter.use(isLoggedIn);

// logout
authRouter.post('/logout', isLoggedIn, (req, res) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.status(202).redirect('/');
    })
});


export default authRouter;