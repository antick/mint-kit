import * as express from 'express';
import authController from './app/user/controllers/auth.controller';

const router = express.Router();

router.use('/auth', authController);
router.use('/user', require('./modules/user/routes/user.route'));

export default router;
