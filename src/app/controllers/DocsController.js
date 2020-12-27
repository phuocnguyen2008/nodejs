// const Docs = require('../models/Docs');
// const { mongooseToObject } = require('../../util/mongoose');

// class SiteController {
class DocsController {
    constructor() {
        this.docs = [
            {
                _id: {
                    $oid: '5fd1e3303e52cd32d54ce9e1',
                },
                name: 'First website with NodeJs',
                description:
                    'Tutorials on HTML, CSS, UI, UX will be summarized in this course, videos with concise and concise content can help students apply immediately into practice.',
                image: 'https://img.youtube.com/vi/nB6cJh_bb1U/sddefault.jpg',
                slug: 'html-css',
                videoId: '71uFmAWSqzQ',
            },
            {
                _id: {
                    $oid: '5fd1e7893e52cd32d54ce9e2',
                },
                name: 'Basic Javascript programming (full version)',
                description:
                    'Basic Javascript course for all beginners to learn programming with short, easy-to-understand content and rich homework system',
                image: 'https://img.youtube.com/vi/0SJE9dYdpps/sddefault.jpg',
                slug: 'javacript',
                videoId: 'hkF_oIm3lU4',
            },
            {
                _id: {
                    $oid: '5fd203390ac64f67e8eea3d7',
                },
                name: 'Bui Phuoc Nguyen',
                description: 'First docs',
                videoId: 'ujgnjdoe87234',
                level: 'A',
                image: 'https://img.youtube.com/vi/ujgnjdoe87234/sddefault.jpg',
                createdAt: {
                    $date: '2020-12-10T11:15:05.915Z',
                },
                updatedAt: {
                    $date: '2020-12-10T11:15:05.915Z',
                },
                __v: 0,
            },
        ];
    }
    index(req, res, next) {
        res.render('home', this.docs);
    }

    show(req, res, next) {
        // console.log(this.docs);
        // res.render('docs/show', this.docs);
        res.send('Show Docs');
    }
    // [GET] /docs/create
    create(req, res, next) {
        res.render('docs/create');
    }

    // [POST] /docs/store
    store(req, res, next) {
        // const formData = req.body;
        // formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        // const docs = new Docs(formData);
        // docs.save()
        //     .then(() => res.redirect('/'))
        //     .catch((error) => {});
        res.send('DMMMMMMMM');
    }
}

module.exports = new DocsController();
