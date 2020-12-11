const newsRouter = require('./news');

function route(app) {
    app.use('/news', newsRouter);

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/search', (req, res) => {
        console.log(req.query.q);
        res.render('search');
    });

    app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('search');
    });
}

module.exports = route;
