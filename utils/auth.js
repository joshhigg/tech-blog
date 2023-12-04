// helper to distinguish between if a user is logged in or not.  If not, redirect to login page
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next()
    }
};

module.exports = withAuth;
