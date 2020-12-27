const CosmosClient = require('@azure/cosmos').CosmosClient;
endpoint = 'https://otanicscosmos.documents.azure.com:443/';
key =
    'mWLXrZPPY151CxxYaRvZ5YhZPqTX3as4q4R9cbIQPWtz6jzlcqISY2PX3cWjk4ISqVKulTya8dvSyQt3wHnHKQ==';
databaseId = 'OtanicsCosmosDB';
containerId = 'Farm';
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

class Create {
    create_user() {
        console.log(document.getElementById('user_hoten').value);
    }
}

module.exports = new Create();
