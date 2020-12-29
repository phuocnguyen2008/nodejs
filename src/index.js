const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 8000;
const CosmosClient = require('@azure/cosmos').CosmosClient;
var session = require('express-session');

const route = require('./routes');
const Database = require('./config/db');
const { resourceUsage } = require('process');
endpoint = 'https://otanicscosmos.documents.azure.com:443/';
key =
    'mWLXrZPPY151CxxYaRvZ5YhZPqTX3as4q4R9cbIQPWtz6jzlcqISY2PX3cWjk4ISqVKulTya8dvSyQt3wHnHKQ==';
databaseId = 'OtanicsCosmosDB';
containerId = 'Farm';
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

// HTTP logger
// app.use(morgan('combined'))
const app = express();

// Database
let db = new Database(databaseId, containerId);

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
