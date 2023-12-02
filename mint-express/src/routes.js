const express = require('express');
const authController = require('./app/user/controllers/auth.controller');
const userController = require('./app/user/controllers/user.controller');

const router = express.Router();

router.use('/auth', authController);
router.use('/user', userController);

module.exports = router;
