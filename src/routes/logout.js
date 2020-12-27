const express = require('express');
const route = require('.');
const router = express.Router();

const logoutController = require('../app/controllers/LogoutController');

router.get('/', logoutController.index);

module.exports = router;
