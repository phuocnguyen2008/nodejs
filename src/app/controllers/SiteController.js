const Docs = require('../models/Docs');
// const { multipleMongooseToObject } = require('../../util/mongoose');
const Database = require('../../config/db');
databaseId = 'web_db_1';
containerId = 'docs';
requirements = 'SELECT * FROM c';

class SiteController {
    // constructor () {
    //     this.cities = [
    //         {
    //             "_id": {
    //                 "$oid": "5fd1e3303e52cd32d54ce9e1"
    //             },
    //             "name": "First website with NodeJs",
    //             "description": "Tutorials on HTML, CSS, UI, UX will be summarized in this course, videos with concise and concise content can help students apply immediately into practice.",
    //             "image": "https://img.youtube.com/vi/nB6cJh_bb1U/sddefault.jpg",
    //             "slug": "html-css",
    //             "videoId": "71uFmAWSqzQ"
    //         },
    //         {
    //             "_id": {
    //                 "$oid": "5fd1e7893e52cd32d54ce9e2"
    //             },
    //             "name": "Basic Javascript programming (full version)",
    //             "description": "Basic Javascript course for all beginners to learn programming with short, easy-to-understand content and rich homework system",
    //             "image": "https://img.youtube.com/vi/0SJE9dYdpps/sddefault.jpg",
    //             "slug": "javacript",
    //             "videoId": "hkF_oIm3lU4"
    //         },
    //         {
    //             "_id": {
    //                 "$oid": "5fd203390ac64f67e8eea3d7"
    //             },
    //             "name": "Bui Phuoc Nguyen",
    //             "description": "First docs",
    //             "videoId": "ujgnjdoe87234",
    //             "level": "A",
    //             "image": "https://img.youtube.com/vi/ujgnjdoe87234/sddefault.jpg",
    //             "createdAt": {
    //                 "$date": "2020-12-10T11:15:05.915Z"
    //             },
    //             "updatedAt": {
    //                 "$date": "2020-12-10T11:15:05.915Z"
    //             },
    //             "__v": 0
    //         },
    //         {
    //             "_id": {
    //                 "$oid": "5fd203d50ac64f67e8eea3d8"
    //             },
    //             "name": "Bui Phuoc Nguyen 111111",
    //             "description": "First docs",
    //             "videoId": "IlU-zDU6aQ0",
    //             "level": "A",
    //             "image": "https://img.youtube.com/vi/IlU-zDU6aQ0/sddefault.jpg",
    //             "createdAt": {
    //                 "$date": "2020-12-10T11:17:41.197Z"
    //             },
    //             "updatedAt": {
    //                 "$date": "2020-12-10T11:17:41.197Z"
    //             },
    //             "__v": 0
    //         },
    //         {
    //             "_id": {
    //                 "$oid": "5fd203d50ac64f67e8eea3d8"
    //             },
    //             "name": "Bui Phuoc Nguyen 111111",
    //             "description": "First docs",
    //             "videoId": "IlU-zDU6aQ0",
    //             "level": "A",
    //             "image": "https://img.youtube.com/vi/IlU-zDU6aQ0/sddefault.jpg",
    //             "createdAt": {
    //                 "$date": "2020-12-10T11:17:41.197Z"
    //             },
    //             "updatedAt": {
    //                 "$date": "2020-12-10T11:17:41.197Z"
    //             },
    //             "__v": 0
    //         }
    //       ];
    // }
    async index(req, res, next) {
        let db = new Database(databaseId, containerId);
        // let cities = await db.cosmosdb_query(requirements);
        // console.log(docs);
        // console.log((cities));
        res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
