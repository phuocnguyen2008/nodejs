const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const port = 8000;
const CosmosClient = require('@azure/cosmos').CosmosClient;

const route = require('./routes');
const Database = require('./config/db');
const { resourceUsage } = require('process');
app.use(express.static(path.join(__dirname, 'public')));
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

// Database
let db = new Database(databaseId, containerId);

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
