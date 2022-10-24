const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const app = require('../../../../main');
const config = require('../../../../config');
const auth = require('../../middlewares/auth.middleware');
const tokenService = require('../../services/token.service');
const emailService = require('../../services/email.service');
const BaseError = require('../../../../middlewares/errors/BaseError');
const setupTestDB = require('../../../../tests/setupTestDb');
const User = require('../../models/user.model');
const Token = require('../../models/token.model');
const { rolePermissions } = require('../../config/roles');
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const {
  userOneAccessToken,
  userOneRefreshToken,
  adminAccessToken,
  adminRefreshToken,
  saveTokens,
  saveAdminToken,
} = require('../fixtures/token.fixture');

setupTestDB();

describe('auth routes', () => {
  describe('[POST] - /api/auth/register', () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };

      jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue('');
    });

    it('should return 201 and successfully register user if request data is ok', async () => {
      const sendWelcomeEmailSpy = jest.spyOn(emailService, 'sendWelcomeEmail');

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(sendWelcomeEmailSpy).toHaveBeenCalledWith(newUser.email);
      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toStrictEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        role: 'user',
      });

      const dbUser = await User.findById(res.body.user.id);

      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        name: newUser.name,
        email: newUser.email,
        role: 'user',
      });
      expect(res.body.tokens).toStrictEqual({
        access: {
          token: expect.anything(),
          expiresIn: expect.anything(),
          expires: expect.anything(),
        },
        refresh: {
          token: expect.anything(),
          expires: expect.anything(),
        },
      });
    });

    it('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if email is already used', async () => {
      await insertUsers([userOne]);

      newUser.email = userOne.email;

      await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'small';

      await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('[POST] - /api/auth/login', () => {
    it('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);

      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginCredentials)
        .expect(httpStatus.OK);

      expect(res.body.user).toStrictEqual({
        id: expect.anything(),
        name: userOne.name,
        email: userOne.email,
        role: userOne.role,
      });

      expect(res.body.tokens).toStrictEqual({
        access: {
          token: expect.anything(),
          expiresIn: expect.anything(),
          expires: expect.anything(),
        },
        refresh: {
          token: expect.anything(),
          expires: expect.anything(),
        },
      });
    });

    it('should return 401 error if there are no user with specified email', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toStrictEqual({
        status: httpStatus.UNAUTHORIZED,
        message: 'Incorrect email or password',
      });
    });

    it('should return 401 error if password is wrong', async () => {
      await insertUsers([userOne]);

      const loginCredentials = {
        email: userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toStrictEqual({
        status: httpStatus.UNAUTHORIZED,
        message: 'Incorrect email or password',
      });
    });
  });

  describe('[POST] - /api/auth/refresh-tokens', () => {
    it('should return 200 and new auth tokens if refresh token is valid', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(refreshToken, userOne._id, expires, 'refresh');

      const res = await request(app).post('/api/auth/refresh-tokens').send({ refreshToken }).expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        access: {
          token: expect.anything(),
          expiresIn: expect.anything(),
          expires: expect.anything(),
        },
        refresh: {
          token: expect.anything(),
          expires: expect.anything(),
        },
      });

      const dbRefreshTokenDoc = await Token.findOne({ token: res.body.refresh.token });
      expect(dbRefreshTokenDoc).toMatchObject({ type: 'refresh', user: userOne._id, blacklisted: false });

      const dbRefreshTokenCount = await Token.countDocuments();
      expect(dbRefreshTokenCount).toBe(1);
    });

    it('should return 400 error if refresh token is missing from request body', async () => {
      await request(app)
        .post('/api/auth/refresh-tokens')
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 401 error if refresh token is signed using an invalid secret', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires, 'invalidSecret');

      await tokenService.saveToken(refreshToken, userOne._id, expires, 'refresh');

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 error if refresh token is not found in the database', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires);

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 error if refresh token is blacklisted', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(refreshToken, userOne._id, expires, 'refresh', true);

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 error if refresh token is expired', async () => {
      await insertUsers([userOne]);

      const expires = moment().subtract(1, 'minutes');
      const refreshToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(refreshToken, userOne._id, expires, 'refresh');

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 error if user is not found', async () => {
      const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      const refreshToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(refreshToken, userOne._id, expires, 'refresh');

      await request(app)
        .post('/api/auth/refresh-tokens')
        .send({ refreshToken })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('[POST] - /api/auth/forgot-password', () => {
    beforeEach(() => {
      jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue('');
    });

    it('should return 204 and send reset password email to the user', async () => {
      await insertUsers([userOne]);

      const sendResetPasswordEmailSpy = jest.spyOn(emailService, 'sendResetPasswordEmail');

      await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: userOne.email })
        .expect(httpStatus.NO_CONTENT);

      expect(sendResetPasswordEmailSpy).toHaveBeenCalledWith(userOne.email, expect.any(String));

      const resetPasswordToken = sendResetPasswordEmailSpy.mock.calls[0][1];
      const dbResetPasswordTokenDoc = await Token.findOne({ token: resetPasswordToken, user: userOne._id });

      expect(dbResetPasswordTokenDoc).toBeDefined();
    });

    it('should return 400 if email is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .post('/api/auth/forgot-password')
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return nothing if email does not exist for password reset', async () => {
      await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: userOne.email })
        .expect(httpStatus.NO_CONTENT);
    });
  });

  describe('[POST] - /api/auth/reset-password', () => {
    it('should return 204 and reset the password', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne._id, expires);
      await tokenService.saveToken(resetPasswordToken, userOne._id, expires, 'resetPassword');

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: 'password2' })
        .expect(httpStatus.NO_CONTENT);

      const dbUser = await User.findById(userOne._id);
      const isPasswordMatch = await bcrypt.compare('password2', dbUser.password);

      expect(isPasswordMatch).toBe(true);

      const dbResetPasswordTokenCount = await Token.countDocuments({ user: userOne._id, type: 'resetPassword' });

      expect(dbResetPasswordTokenCount).toBe(0);
    });

    it('should return 400 if reset password token is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .post('/api/auth/reset-password')
        .send({ password: 'password2' })
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 401 if reset password token is blacklisted', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(resetPasswordToken, userOne._id, expires, 'resetPassword', true);

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: 'password2' })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 if reset password token is expired', async () => {
      await insertUsers([userOne]);

      const expires = moment().subtract(1, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(resetPasswordToken, userOne._id, expires, 'resetPassword');

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: 'password2' })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 401 if user is not found', async () => {
      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(resetPasswordToken, userOne._id, expires, 'resetPassword');

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: 'password2' })
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 400 if password is missing or invalid', async () => {
      await insertUsers([userOne]);

      const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      const resetPasswordToken = tokenService.generateToken(userOne._id, expires);

      await tokenService.saveToken(resetPasswordToken, userOne._id, expires, 'resetPassword');

      await request(app).post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .expect(httpStatus.BAD_REQUEST);

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: 'short1' })
        .expect(httpStatus.BAD_REQUEST);

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: 'password' })
        .expect(httpStatus.BAD_REQUEST);

      await request(app)
        .post('/api/auth/reset-password')
        .query({ token: resetPasswordToken })
        .send({ password: '11111111' })
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});

describe('auth middleware', () => {
  it('should call next with no errors if access token is valid', async () => {
    await insertUsers([userOne]);
    await saveTokens(userOneRefreshToken);

    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user._id).toStrictEqual(userOne._id);
  });

  it('should call next with unauthorized error if access token is not found in header', async () => {
    await insertUsers([userOne]);

    const req = httpMocks.createRequest();
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Authentication required!' }),
    );
  });

  it('should call next with unauthorized error if access token is not a valid jwt token', async () => {
    await insertUsers([userOne]);

    const req = httpMocks.createRequest({ headers: { Authorization: 'Bearer randomToken' } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Authentication required!' }),
    );
  });

  it('should call next with unauthorized error if access token is generated with an invalid secret', async () => {
    await insertUsers([userOne]);

    const tokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = tokenService.generateToken(userOne._id, tokenExpires, 'invalidSecret');
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Authentication required!' }),
    );
  });

  it('should call next with unauthorized error if access token is expired', async () => {
    await insertUsers([userOne]);

    const tokenExpires = moment().subtract(1, 'minutes');
    const accessToken = tokenService.generateToken(userOne._id, tokenExpires);
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Authentication required!' }),
    );
  });

  it('should call next with unauthorized error if user is not found', async () => {
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Authentication required!' }),
    );
  });

  it('should call next with forbidden error if user does not have required permissions and userId in params', async () => {
    await insertUsers([userOne]);
    await saveTokens(userOneRefreshToken);

    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const next = jest.fn();

    await auth('anyPermission')(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(BaseError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: httpStatus.FORBIDDEN,
      message: 'Not allowed',
    }));
  });

  it('should call next with no errors if user does not have required permissions but userId is in params', async () => {
    await insertUsers([userOne]);
    await saveTokens(userOneRefreshToken);

    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer ${userOneAccessToken}` },
      params: { userId: userOne._id.toHexString() },
    });
    const next = jest.fn();

    await auth('anyPermission')(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with no errors if user has required permissions', async () => {
    await insertUsers([admin]);
    await saveAdminToken(adminRefreshToken);

    const req = httpMocks.createRequest({
      headers: { Authorization: `Bearer ${adminAccessToken}` },
      params: { userId: userOne._id.toHexString() },
    });
    const next = jest.fn();

    await auth(...rolePermissions.get('admin'))(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith();
  });
});
