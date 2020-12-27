// const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb://localhost:27018/web_db', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true,
//         });
//         console.log('Connect successfully!!!');
//     } catch (error) {
//         console.log('Connection failed!!!');
//     }
// }

const { CosmosClient } = require('@azure/cosmos');
const endpoint = 'https://otanicscosmos.documents.azure.com:443/';
const key =
    'mWLXrZPPY151CxxYaRvZ5YhZPqTX3as4q4R9cbIQPWtz6jzlcqISY2PX3cWjk4ISqVKulTya8dvSyQt3wHnHKQ==';
const client = new CosmosClient({ endpoint, key });
// databaseId = 'web_db_1';
// containerId = 'docs';

let Database = class {
    constructor(databaseId, containerId) {
        this.database = client.database(databaseId);
        this.container = this.database.container(containerId);
    }

    async cosmosdb_insert_item(input_items) {
        for (const input_item of input_items) {
            this.container.items.create(input_item);
        }
    }

    async cosmosdb_read_item(requirements) {
        await this.container.item(requirements).read();
    }

    async cosmosdb_delete_item(requirements) {
        await this.container.item(requirements).delete();
    }

    async cosmosdb_query(requirements) {
        const { resources } = await this.container.items
            .query(requirements)
            .fetchAll();
        // for (const city of resources) {
        //     console.log(`${city.name}, ${city.description}`);
        //   }
        return resources;
    }
};

// module.exports = { cosmosdb_create_database, cosmosdb_create_container, cosmosdb_insert_item, cosmosdb_read_item, cosmosdb_delete_item, cosmosdb_query };
module.exports = Database;
