import mysql from 'mysql2/promise';
import express from 'express';
import path from 'path';
import authRouter from './routes/authenticationRoutes.js';
import adminRouter from './routes/adminRoutes.js'
import logger from './middleware/loggerMiddleware.js';
import errorHandler from './middleware/errorMiddleware.js';
import { isLoggedIn } from './middleware/authenticationMiddleware.js';
import { fileURLToPath } from 'node:url';
import session from 'express-session';
import * as items from './controllers/items.js';



// get the root directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const loginPagePath = path.join(__dirname, 'static/auth', 'login.html');

const port = process.env.PORT || 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './static');

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
app.use('/admin', adminRouter);
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
});


// 404 middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

export const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    port: '3306',
    user: 'theodore',
    password: '1234',
    database: 'unifront'
});

app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);

const json = await items.fetchFromCeid();
//items.initCategories(json.categories);
//items.initItems(json.items);

