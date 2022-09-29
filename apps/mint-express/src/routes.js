import * as express from 'express';
import authController from './app/user/controllers/auth.controller';
import userController from './app/user/controllers/user.controller';

const router = express.Router();

router.use('/auth', authController);
router.use('/user', userController);

export default router;
