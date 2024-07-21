import express from 'express';
import { client } from '../server.js'

const authRouter = express.Router();

// login
authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} ${password}`);

    await client.connect();

    const database = client.db("unifrontDB");
    const users = database.collection("users");

    const user = await users.findOne({ username: username, password: password });

    if (user) {
        req.session.loggedin = true;
        req.session.username = username;
        console.log(`${username} logged in.`);
        //redirect
    } else {
        res.send('Incorrect username and/or password');
    }

});


export default authRouter;