const newsRouter = require('./news');
const siteRouter = require('./site');
const docsRouter = require('./docs');
const loginRouter = require('./login');
const logoutRouter = require('./logout');

function route(app) {
    app.use('/news', newsRouter);

    app.use('/docs', docsRouter);

    app.use('/login', loginRouter);

    app.use('/logout', logoutRouter);

    app.use('/', siteRouter);
}

module.exports = route;
