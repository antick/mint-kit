import * as passport from 'passport';
import AuthError from '../../../middlewares/errors/AuthError';
import ForbiddenError from '../../../middlewares/errors/ForbiddenError';
import { rolePermissions } from '../config/roles';

const authorization = (req, resolve, reject, requiredPermissions) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new AuthError());
  }

  req.user = user;

  if (requiredPermissions.length) {
    const userPermissions = rolePermissions.get(user.role);
    const hasPermission = requiredPermissions.every(requiredRight => userPermissions.includes(requiredRight));

    if (!hasPermission && req.params.userId !== user.id) {
      return reject(new ForbiddenError());
    }
  }

  resolve();
};

const authMiddleware = (...requiredPermissions) => async (req, res, next) => new Promise((resolve, reject) => {
  passport.authenticate(
    'jwt',
    { session: false },
    authorization(req, resolve, reject, requiredPermissions)
  )(req, res, next);
})
  .then(() => next())
  .catch(err => next(err));

export default authMiddleware;
