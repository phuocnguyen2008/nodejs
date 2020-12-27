const CosmosClient = require('@azure/cosmos').CosmosClient;
endpoint = 'https://otanicscosmos.documents.azure.com:443/';
key =
    'mWLXrZPPY151CxxYaRvZ5YhZPqTX3as4q4R9cbIQPWtz6jzlcqISY2PX3cWjk4ISqVKulTya8dvSyQt3wHnHKQ==';
databaseId = 'OtanicsCosmosDB';
containerId = 'Farm';
container1Id = 'Ao';
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);
const container1 = database.container(container1Id);

var db_data, name, level;
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
        console.log(username, password);
        var check_flag = false;
        if (username && password) {
            QueryInfo(res, username, password);
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
        res.render('login/create');
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
        CreateUser(res, info);
    }
    delete(req, res) {
        res.render('login/delete');
    }
    delete_user(req, res) {
        res.send('Delete_user');
    }
}

// Function for login
async function QueryInfo(res, username, password) {
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
                flag: true,
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
                flag: true,
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
                flag: true,
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
                flag: true,
                ten: name,
                cap: level,
                L4,
            });
        }
        db_data = resources;
    }
}

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

async function CreateUser(res, info) {
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
    res.send('Successfully created !!!');
}

module.exports = new LoginController();
