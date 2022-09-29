import * as moment from 'moment';
import config from '../../../../config';
import tokenService from '../../services/token.service';
import { userOne, admin } from './user.fixture';

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');

const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires);
const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires);

const userOneRefreshToken = tokenService.generateToken(userOne._id, refreshTokenExpires);
const adminRefreshToken = tokenService.generateToken(admin._id, refreshTokenExpires);

const saveTokens = async refreshToken => {
  await tokenService.saveToken(refreshToken, userOne._id, refreshTokenExpires, 'refresh');
};

const saveAdminToken = async refreshToken => {
  await tokenService.saveToken(refreshToken, admin._id, refreshTokenExpires, 'refresh');
};

export {
  userOneRefreshToken,
  accessTokenExpires,
  userOneAccessToken,
  adminRefreshToken,
  adminAccessToken,
  saveAdminToken,
  saveTokens
};
