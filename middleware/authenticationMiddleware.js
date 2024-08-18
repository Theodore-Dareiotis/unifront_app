import { loginPagePath } from "../server.js";



export const isLoggedIn = (req, res, next) => {
    console.log(`Request for: ${req.path}`);
    if (req.session.user) {
        next();
        console.log('authenticated');
    } else {
        console.log(`Redirecting ${loginPagePath}`);
        res.sendFile(loginPagePath);
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.isAdmin) {
        next();
    } else {
        res.status(403).send('Forbidden: Admins only.');
    }
};


