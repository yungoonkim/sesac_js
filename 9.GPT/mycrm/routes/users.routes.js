
const router = require('express').Router();
const controller = require('../controllers/users.controller');

router.get('/', controller.getUsers);
module.exports = router;
