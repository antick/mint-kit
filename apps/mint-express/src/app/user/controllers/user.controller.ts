import _ from 'lodash'
import * as express from 'express';
import * as httpStatus from 'http-status';
import validationMiddleware from '../../../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import userValidation from './validators/user.validator';
import uploadMiddleware from '../middlewares/upload.middleware';
import NotFoundError from '../../../middlewares/errors/NotFoundError';
import { controller, pick } from '../../../utils';
import userService from '../services/user.service';
import tokenService from '../services/token.service';

const userController = express.Router();

userController
  .route('/logout/:refreshToken')
  .delete(authMiddleware('login'), controller(async (req, res) => {
    await tokenService.deleteRefreshToken(req.params.refreshToken);

    res.status(httpStatus.NO_CONTENT).send();
  }));

userController
  .route('/')
  .post(authMiddleware('manageUsers'), validationMiddleware(userValidation.createUser), controller(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(httpStatus.CREATED).send(user);
  }))
  .get(authMiddleware('getUsers'), validationMiddleware(userValidation.getUsers), controller(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const result = await userService.queryUsers(filter, options);

    res.send(result);
  }));

userController
  .route('/profile')
  .get(authMiddleware('manageUsers'), controller(async (req, res) => {
    const user = await userService.getUserById(req.user._id);

    res.send(user);
  }))
  .put(authMiddleware('manageUsers'), uploadMiddleware.single('avatar'), controller(async (req, res) => {
    if (_.get(req, 'file.filename', false)) {
      req.body.avatar = _.get(req, 'file.filename', false);
    }

    // Explicitly setting it to null if it's empty, since formData only sends string values
    req.body.avatar = !_.isEmpty(req.body.avatar) ? req.body.avatar : null;

    const user = await userService.updateProfile(req.user._id, req.body);

    res.send(user);
  }));

userController
  .route('/:userId')
  .get(authMiddleware('getUsers'), validationMiddleware(userValidation.getUser), controller(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    res.send(user);
  }))
  .patch(authMiddleware('manageUsers'), validationMiddleware(userValidation.updateUser), controller(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);

    res.send(user);
  }))
  .delete(authMiddleware('manageUsers'), validationMiddleware(userValidation.deleteUser), controller(async (req, res) => {
    await userService.deleteUserById(req.params.userId);

    res.status(httpStatus.NO_CONTENT).send();
  }));

export default userController;
