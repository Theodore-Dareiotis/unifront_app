import express from 'express';
import path from 'path';
import router from './routes/posts.js';
import authRouter from './routes/authentication.js';
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import isLoggedIn from './middleware/isLoggedIn.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { fileURLToPath } from 'node:url';
import session from 'express-session';
import * as items from './controllers/items.js';



// get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const loginPagePath = path.join(__dirname, 'static/auth', 'login.html');

const port = process.env.PORT || 8000;
const app = express();


// ---------------MIDDLEWARE------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'very_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 12 }, // 12 hours
}
));
app.use('/auth', authRouter);
app.use(isLoggedIn);
app.use(express.static(path.join(__dirname, 'static'))); // setup folder that serves static files

app.get('/', (req, res) => {

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
    //res.sendFile(path.join(__dirname, 'static', 'index.html'));
});


// 404 middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use(errorHandler);

// connecting to mongoDB server
const mongo_uri = "mongodb+srv://Tdareiotis:230240fR@recoopdb.fclzywo.mongodb.net/?retryWrites=true&w=majority&appName=recoopDB";

// MongoClient should be created once and reused
export const client = new MongoClient(mongo_uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);

//const json = await items.fetchFromCeid();
// await items.insertItems(json.items);
// await items.insertCategories(json.categories);

