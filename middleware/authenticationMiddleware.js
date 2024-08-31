

export const isLoggedIn = (req, res, next) => {
    console.log(`Authenticating: ${req.path}`);
    if (req.session.user) {
        next();
        console.log('Authenticated.');
    } else {
        res.status(400).redirect('/login-page');
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.isAdmin) {
        next();
    } else {
        res.status(403).send('Forbidden: Admins only.');
    }
};


