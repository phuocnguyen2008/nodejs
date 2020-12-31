const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
var session = require('express-session');

const route = require('./routes');
const Database = require('./config/db');
const { resourceUsage } = require('process');
const port = process.env.PORT;
const app = express();

const hbs_helper = require('handlebars');
hbs_helper.registerHelper(
    'each_modified',
    function (context, context2, options) {
        return new hbs_helper.SafeString(`<div class="custom-control custom-checkbox" style="left: 50%; ">
                                        <input type="checkbox" class="custom-control-input" id="kg_1" ${context2[context]}>
                                        <label class="custom-control-label" for="kg_1"></label>
                                      </div>`);
    },
);

app.use(express.static(path.join(__dirname, 'public')));

// Middleware for POST method to get body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(
    session({
        secret: 'keyboard cat',
        cookie: { maxAge: 60000 },
    }),
);
// Template Engine
app.engine('hbs', handlebars({ extname: '.hbs' }));

// Set view
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Action ---> Dispatcher ---> Function handler
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
