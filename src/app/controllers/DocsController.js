const Docs = require('../models/Docs');
const { mongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        Docs.find({})
            .then((docs) => {
                res.render('home', {
                    docs: mongooseToObject(docs),
                });
            })
            .catch(next);
    }

    show(req, res, next) {
        Docs.findOne({ slug: req.params.slug })
            .then((docs) => {
                res.render('docs/show', { docs: mongooseToObject(docs) });
            })
            .catch(next);
    }
    // [GET] /docs/create
    create(req, res, next) {
        res.render('docs/create');
    }

    // [POST] /docs/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const docs = new Docs(formData);
        docs.save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new SiteController();
