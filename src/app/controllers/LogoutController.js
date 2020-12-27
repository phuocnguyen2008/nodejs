class LogoutController {
    index(req, res) {
        res.redirect('/');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new LogoutController();
