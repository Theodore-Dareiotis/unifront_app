import { loginPagePath } from "../server.js";



const isLoggedIn = (req, res, next) => {
    console.log(`Request for: ${req.path}`);
    if (req.session.user) {
        next();
        console.log('authenticated');
    } else {
        console.log(`Redirecting ${loginPagePath}`);
        res.sendFile(loginPagePath);
    }
}

export default isLoggedIn;