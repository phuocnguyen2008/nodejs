const Docs = require('../models/Docs');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        Docs.find({})
            .then((docs) => {
                res.render('home', {
                    docs: multipleMongooseToObject(docs),
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
