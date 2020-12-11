const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
// app.use(morgan('combined'))

// Connect to DB
db.connect();

// Middleware for POST method to get body
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Template Engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

// Set view
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Action ---> Dispatcher ---> Function handler
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
