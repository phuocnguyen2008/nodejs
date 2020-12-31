const express = require('express');
const route = require('.');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/ao/:slug', loginController.xemao);
router.get('/khu/:slug', loginController.xemkhu);
router.get('/trai/:slug', loginController.xemtrai);
router.get('/create', loginController.create);
router.get('/delete', loginController.delete);
router.get('/role', loginController.show_role);
router.post('/create', loginController.create_user);
router.post('/delete', loginController.delete_user);
router.post('/', loginController.show);
router.get('/', loginController.index);

module.exports = router;
