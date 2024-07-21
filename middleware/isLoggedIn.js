const isLoggedIn = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.status(401).send('Please log in to view this page.');
    }
}

export default isLoggedIn;