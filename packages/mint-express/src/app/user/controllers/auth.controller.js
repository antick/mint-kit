const express = require('express');
const httpStatus = require('http-status');
const validationMiddleware = require('../../../middlewares/validation.middleware');
const { controller } = require('../../../utils');
const authValidator = require('./validators/auth.validator');
const userService = require('../services/user.service');
const emailService = require('../services/email.service');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const authController = express.Router();

authController.post(
  '/register',
  validationMiddleware(authValidator.register),
  controller(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);

    await emailService.sendWelcomeEmail(req.body.email);

    res.status(httpStatus.CREATED).send({ user, tokens });
  })
);

authController.post(
  '/login',
  validationMiddleware(authValidator.login),
  controller(async (req, res) => {
    const { email, password } = req.body;

    const user = await authService.authenticate(email, password);
    const tokens = await tokenService.generateAuthTokens(user);

    res.send({ user, tokens });
  })
);

authController.post(
  '/refresh-tokens',
  validationMiddleware(authValidator.refreshTokens),
  controller(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);

    res.send({ ...tokens });
  })
);

authController.post(
  '/forgot-password',
  validationMiddleware(authValidator.forgotPassword),
  controller(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);

    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

    res.status(httpStatus.NO_CONTENT).send();
  })
);

authController.post(
  '/reset-password',
  validationMiddleware(authValidator.resetPassword),
  controller(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);

    res.status(httpStatus.NO_CONTENT).send();
  })
);

module.exports = {
  authController
};
