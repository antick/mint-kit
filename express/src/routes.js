const express = require('express');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');

const router = express.Router();

router.use('/auth', authController);
router.use('/user', userController);

module.exports = router;
