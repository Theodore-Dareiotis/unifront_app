const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.isAdmin) {
        next();
    } else {
        res.status(403).send('Forbidden: Admins only.');
    }
};

