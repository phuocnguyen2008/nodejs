const express = require('express');
const { doc } = require('prettier');
const route = require('.');
const router = express.Router();

const docsController = require('../app/controllers/DocsController');

router.get('/create', docsController.create);
router.get('/store', docsController.store);
router.get('/:slug', docsController.index);
router.get('/', docsController.show);

module.exports = router;
