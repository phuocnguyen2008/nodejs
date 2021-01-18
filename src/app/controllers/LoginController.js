const CosmosClient = require('@azure/cosmos').CosmosClient;
// const Swal = require('sweetalert2');

endpoint = 'https://otanicscosmos.documents.azure.com:443/';
key =
    'mWLXrZPPY151CxxYaRvZ5YhZPqTX3as4q4R9cbIQPWtz6jzlcqISY2PX3cWjk4ISqVKulTya8dvSyQt3wHnHKQ==';
databaseId = 'OtanicsCosmosDB';
containerId = 'Farm';
container1Id = 'Ao';
container2Id = 'Level';
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);
const container1 = database.container(container1Id);
const container2 = database.container(container2Id);

var db_data, name, level, flag;
var trai = [];
var nhanvien = [];
var ao = [];
var L1 = false,
    L2 = false,
    L3 = false,
    L4 = false;

class LoginController {
    index(req, res) {
        res.render('login');
    }
    show(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var check_flag = false;
        if (username && password) {
            QueryInfo(req, res, username, password);
        } else {
            res.send('Invalid Username or Password !!!');
        }
    }
    xemao(req, res) {
        QueryInfoAo(res, req.params.slug);
    }
    xemkhu(req, res) {
        QueryInfoKhu(res, req.params.slug);
    }
    xemtrai(req, res) {
        QueryInfoTrai(res, req.params.slug);
    }
    create(req, res) {
        res.render('login/create', {
            data: req.session.trai,
            data_NhanVien: req.session.NhanVien,
            data_ao: req.session.ao,
            flag: req.session.flag,
            L1: req.session.L1,
            ten: req.session.name,
            cap: req.session.level,
        });
    }
    create_user(req, res) {
        let info = {
            user_hoten: req.body.user_hoten,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_level: req.body.user_level,
            user_trai: req.body.user_trai,
            user_khu: req.body.user_khu,
            user_jetson: req.body.user_jetson,
        };
        CreateUser(req, res, info);
    }
    delete(req, res) {
        console.log('Test1');
        QueryUser(req, res);
    }
    delete_user(req, res) {
        DeleteUser(req, res, req.body);
    }
    show_role(req, res) {
        QueryInfoRole(req, res);
    }
    getToken(req, res) {
        console.log(
            getAuthorizationTokenUsingMasterKey(
                'POST',
                'sprocs',
                'dbs/OtanicsDB/colls/Ao/sprocs/querypH',
                'Thu, 07 Jan 2021 09:07:00 GMT',
                'mWLXrZPPY151CxxYaRvZ5YhZPqTX3as4q4R9cbIQPWtz6jzlcqISY2PX3cWjk4ISqVKulTya8dvSyQt3wHnHKQ==',
            ),
        );
    }
}
// Information login: Query username and password
async function QueryInfo(req, res, username, password) {
    let querySpec = {
        query: `SELECT c.HoTen, c.Level, c.Id FROM c in Farm.NhanVien WHERE c.Email = '${username}' AND c.Password = '${password}'`,
    };
    var { resources } = await container.items.query(querySpec).fetchAll();
    if (resources.length == 0) {
        res.send('Invalid Username or Password !!!');
    } else {
        (trai = []), (nhanvien = []), (ao = []);
        name = resources[0].HoTen;
        level = resources[0].Level;
        flag = true;
        let id = resources[0].Id;
        if (level == 'L1') {
            L1 = true;
            L2 = false;
            L3 = false;
            L4 = false;
            let querySpec1 = { query: 'SELECT * FROM f' };
            var { resources } = await container.items
                .query(querySpec1)
                .fetchAll();
            trai = resources;
            for (n = 0; n < resources.length; n++) {
                for (m = 0; m < resources[n].NhanVien.length; m++) {
                    let temp = resources[n].NhanVien[m].Id.split('_');
                    if (temp.length == 4) {
                        nhanvien.push({ id: resources[n].NhanVien[m].Id });
                    } else if (temp.length == 6) {
                        ao.push({
                            id: resources[n].NhanVien[m].Jetson.AoNuoi1,
                        });
                        ao.push({
                            id: resources[n].NhanVien[m].Jetson.AoNuoi2,
                        });
                        ao.push({ id: resources[n].NhanVien[m].Jetson.AoVeo });
                    }
                }
            }

            res.render('login/detail', {
                data: trai,
                data_NhanVien: nhanvien,
                data_ao: ao,
                flag,
                L1,
                ten: name,
                cap: level,
            });
        } else if (level == 'L2') {
            L2 = true;
            L1 = false;
            L4 = false;
            L3 = false;
            let querySpec1 = {
                query: `SELECT * FROM f in Farm.NhanVien WHERE f.Id BETWEEN '${id}_' AND '${id}__' `,
            };
            var { resources } = await container.items
                .query(querySpec1)
                .fetchAll();

            for (n = 0; n < resources.length; n++) {
                let temp = resources[n].Id.split('_');
                if (temp.length == 4) nhanvien.push({ id: resources[n].Id });
                else if (temp.length == 6) {
                    ao.push({ id: resources[n].Jetson.AoNuoi1 });
                    ao.push({ id: resources[n].Jetson.AoNuoi2 });
                    ao.push({ id: resources[n].Jetson.AoVeo });
                }
            }
            res.render('login/detail', {
                data_NhanVien: nhanvien,
                data_ao: ao,
                flag,
                ten: name,
                cap: level,
                L2,
            });
        } else if (level == 'L3') {
            L3 = true;
            L2 = false;
            L1 = false;
            L4 = false;
            let querySpec1 = {
                query: `SELECT * FROM f in Farm.NhanVien WHERE f.Id BETWEEN '${id}_' AND '${id}__' `,
            };
            var { resources } = await container.items
                .query(querySpec1)
                .fetchAll();
            for (n = 0; n < resources.length; n++) {
                ao.push({ id: resources[n].Jetson.AoNuoi1 });
                ao.push({ id: resources[n].Jetson.AoNuoi2 });
                ao.push({ id: resources[n].Jetson.AoVeo });
            }
            res.render('login/detail', {
                data_ao: ao,
                flag,
                ten: name,
                cap: level,
                L3,
            });
        } else if (level == 'L4') {
            L4 = true;
            L1 = false;
            L2 = false;
            L3 = false;
            let querySpec1 = {
                query: `SELECT * FROM f in Farm.NhanVien WHERE f.Id BETWEEN '${id}' AND '${id}_' `,
            };
            var { resources } = await container.items
                .query(querySpec1)
                .fetchAll();
            for (n = 0; n < resources.length; n++) {
                ao.push({ id: resources[n].Jetson.AoNuoi1 });
                ao.push({ id: resources[n].Jetson.AoNuoi2 });
                ao.push({ id: resources[n].Jetson.AoVeo });
            }
            res.render('login/detail', {
                data_ao: ao,
                flag,
                ten: name,
                cap: level,
                L4,
            });
        }
        db_data = resources;
    }
}

// Start --- Information after login: Query info ao khu trai
async function QueryInfoAo(res, aoId) {
    let querySpec = {
        query: `SELECT * FROM e WHERE e.AoId = '${aoId}'`,
    };
    var { resources } = await container1.items.query(querySpec).fetchAll();
    N = resources.length;
    resources_ = resources[N - 1];
    resources = db_data;
    res.render('login/xemao', {
        resources_,
        resources,
        data: trai,
        data_NhanVien: nhanvien,
        data_ao: ao,
        flag: true,
        L1,
        L2,
        L3,
        L4,
        ten: name,
        cap: level,
    });
}

async function QueryInfoKhu(res, khuId) {
    var resources = db_data;
    res.render('login/xemkhu', {
        resources,
        data: trai,
        data_NhanVien: nhanvien,
        data_ao: ao,
        flag: true,
        L1,
        L2,
        L3,
        L4,
        ten: name,
        cap: level,
    });
}

async function QueryInfoTrai(res, traiId) {
    var resources = db_data;
    res.render('login/xemtrai', {
        resources,
        data: trai,
        data_NhanVien: nhanvien,
        data_ao: ao,
        flag: true,
        L1,
        L2,
        L3,
        L4,
        ten: name,
        cap: level,
    });
}
// Information after login: Query info ao khu trai --- End

async function CreateUser(req, res, info) {
    if (info.user_trai == 'Kiên Giang') {
        info.ModuleId = 'KG';
        info.user_trai = '1';
    } else {
        info.user_trai = '2';
        info.ModuleId = 'LA';
    }
    let querySpec = {
        query: `SELECT * FROM b WHERE b.ModuleId = '${info.ModuleId}'`,
    };
    var { resources } = await container.items.query(querySpec).fetchAll();
    resources = resources[0];
    let N = resources.NhanVien.length;
    if (info.user_level == 'L1') {
        var count = 0;
        for (n = 0; n < N; n++) {
            if (resources.NhanVien[n].Level == 'L1') count++;
        }
        info.user_id = `V_${count + 1}`;
    } else if (info.user_level == 'L2') {
        info.user_id = `F_${info.user_trai}`;
    } else if (info.user_level == 'L3') {
        info.user_id = `F_${info.user_trai}_M_${info.user_khu}`;
    } else {
        info.user_id = `F_${info.user_trai}_M_${info.user_khu}_J_${info.user_jetson}`;
        info.Jetson = {
            AoNuoi1: `F_${info.user_trai}_M_${info.user_khu}_J_${info.user_jetson}_P_1`,
            AoNuoi2: `F_${info.user_trai}_M_${info.user_khu}_J_${info.user_jetson}_P_2`,
            AoVeo: `F_${info.user_trai}_M_${info.user_khu}_J_${info.user_jetson}_P_3`,
        };
    }
    const { id, ModuleId } = resources;
    if (info.user_level == 'L4') {
        resources.NhanVien.push({
            HoTen: info.user_hoten,
            Id: info.user_id,
            Level: info.user_level,
            Email: info.user_email,
            Password: info.user_password,
            Jetson: info.Jetson,
        });
    } else {
        resources.NhanVien.push({
            HoTen: info.user_hoten,
            Id: info.user_id,
            Level: info.user_level,
            Email: info.user_email,
            Password: info.user_password,
        });
    }
    const { resource: updatedItem } = await container
        .item(id, ModuleId)
        .replace(resources);
    console.log(ao);
    res.render('login/create', {
        data: trai,
        data_NhanVien: nhanvien,
        data_ao: ao,
        flag: flag,
        L1,
        ten: name,
        cap: level,
        success: true,
    });
}

async function QueryUser(req, res) {
    let data_kg_;
    let data_la_;
    let data_kg = [];
    let data_la = [];
    let querySpec = {
        query: 'SELECT * from c',
    };
    var { resources } = await container.items.query(querySpec).fetchAll();
    for (i = 0; i < resources.length; i++) {
        if (resources[i].ModuleId == 'KG') {
            data_kg_ = resources[i];
        } else {
            data_la_ = resources[i];
        }
    }
    for (j = 0; j < data_kg_.NhanVien.length; j++) {
        if (data_kg_.NhanVien[j].Level == 'L1') continue;
        else data_kg.push(data_kg_.NhanVien[j]);
    }
    for (k = 0; k < data_la_.NhanVien.length; k++) {
        if (data_la_.NhanVien[k].Level == 'L1') continue;
        else data_la.push(data_la_.NhanVien[k]);
    }
    res.render('login/delete', {
        resources_kg: data_kg,
        resources_la: data_la,
        deleted: false,
        data: trai,
        data_NhanVien: nhanvien,
        data_ao: ao,
        flag: flag,
        L1,
        ten: name,
        cap: level,
    });
}

async function DeleteUser(req, res, data) {
    for (let i = 0; i < data.data.length; i++) {
        getKey = Object.keys(data.data[i]).toString();
        console.log(getKey);
        let querySpec = {
            query: `SELECT * FROM b WHERE b.ModuleId = '${getKey}'`,
        };
        var { resources } = await container.items.query(querySpec).fetchAll();
        resources = resources[0];
        // console.log(resources)
        const { id, ModuleId } = resources;
        let index = resources.NhanVien.map((element) => element.Email).indexOf(
            data.data[i][getKey][0],
        );
        resources.NhanVien.splice(index, 1);
        const { resource: updatedItem } = await container
            .item(id, ModuleId)
            .replace(resources);
    }
    // QueryUser(req, res);
}

async function QueryInfoRole(req, res) {
    let querySpec = {
        query: 'SELECT * FROM c ',
    };
    var { resources } = await container2.items.query(querySpec).fetchAll();
    // console.log(resources);
    let table_heads = resources[resources.length - 1];
    let table_keys = Object.keys(table_heads.ChucNang);
    // console.log(table_heads);
    console.log(table_keys);
    res.render('login/xemvaitro', {
        data_chucnang: resources,
        table_keys: table_keys,
        data: trai,
        data_NhanVien: nhanvien,
        data_ao: ao,
        flag: flag,
        L1,
        ten: name,
        cap: level,
    });
}
var crypto = require('crypto');

function getAuthorizationTokenUsingMasterKey(
    verb,
    resourceType,
    resourceId,
    date,
    masterKey,
) {
    var key = new Buffer.from(masterKey, 'base64');

    var text =
        (verb || '').toLowerCase() +
        '\n' +
        (resourceType || '').toLowerCase() +
        '\n' +
        (resourceId || '') +
        '\n' +
        date.toLowerCase() +
        '\n' +
        '' +
        '\n';

    var body = new Buffer.from(text, 'utf8');
    var signature = crypto
        .createHmac('sha256', key)
        .update(body)
        .digest('base64');

    var MasterToken = 'master';

    var TokenVersion = '1.0';

    return encodeURIComponent(
        'type=' + MasterToken + '&ver=' + TokenVersion + '&sig=' + signature,
    );
}

module.exports = new LoginController();
