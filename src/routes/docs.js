const express = require('express');
const { doc } = require('prettier');
const route = require('.');
const router = express.Router();

const docsController = require('../app/controllers/DocsController');

router.get('/create', docsController.create);
router.post('/store', docsController.store);
router.get('/:slug', docsController.show);

module.exports = router;
