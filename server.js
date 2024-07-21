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
import cookieParser from 'cookie-parser';



// get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8000;
const app = express();


console.log(__dirname);


// ---------------MIDDLEWARE------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'very_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}
));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});

app.use('/auth', authRouter);
app.use(isLoggedIn); // all routes beyond this point need an open session

app.use(express.static(path.join(__dirname, 'static'))); // setup folder that serves static files

// protected routes


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

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);



