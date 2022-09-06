import * as request from 'supertest';
import * as faker from 'faker';
import * as httpStatus from 'http-status';
import * as app from '../../../../main';
import setupTestDB from '../../../../utils/setupTestDB';
import User from '../../models/user.model';
import { userOne, userTwo, admin, insertUsers } from '../fixtures/user.fixture';
import {
  userOneAccessToken,
  userOneRefreshToken,
  adminAccessToken,
  adminRefreshToken,
  saveTokens,
  saveAdminToken
} from '../fixtures/token.fixture';

setupTestDB();

describe('user routes', () => {
  describe('[POST] - /api/user', () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user'
      };
    });

    it('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toStrictEqual({
        id: expect.anything(), name: newUser.name, email: newUser.email, role: newUser.role
      });

      const dbUser = await User.findById(res.body.id);

      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, role: newUser.role });
    });

    it('should be able to create an admin', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      newUser.role = 'admin';

      const res = await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.role).toBe('admin');

      const dbUser = await User.findById(res.body.id);

      expect(dbUser.role).toBe('admin');
    });

    it('should return 401 error is access token is missing', async () => {
      await request(app)
        .post('/api/user')
        .send(newUser)
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 403 error if logged in user is not admin', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newUser)
        .expect(httpStatus.FORBIDDEN);
    });

    it('should return 400 error if email is invalid', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      newUser.email = 'invalidEmail';

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if email is already used', async () => {
      await insertUsers([admin, userOne]);
      await saveAdminToken(adminRefreshToken);

      newUser.email = userOne.email;

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if password length is less than 8 characters', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      newUser.password = 'small';

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if password does not contain both letters and numbers', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      newUser.password = 'password';

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = '1111111';

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 error if role is neither user nor admin', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      newUser.role = 'invalid';

      await request(app)
        .post('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('[GET] /api/user', () => {
    it('should return 200 and apply the default query options', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toStrictEqual({
        id: userOne._id.toHexString(),
        name: userOne.name,
        email: userOne.email,
        role: userOne.role
      });
    });

    it('should return 401 if access token is missing', async () => {
      await insertUsers([userOne, userTwo, admin]);

      await request(app)
        .get('/api/user')
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 403 if a non-admin is trying to access all user', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveTokens(userOneRefreshToken);

      await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    it('should correctly apply filter on name field', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ name: userOne.name })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
    });

    it('should correctly apply filter on role field', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ role: 'user' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
    });

    it('should correctly sort returned array if descending sort param is specified', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ sortBy: 'role:desc' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
      expect(res.body.results[2].id).toBe(admin._id.toHexString());
    });

    it('should correctly sort returned array if ascending sort param is specified', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ sortBy: 'role:asc' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0].id).toBe(admin._id.toHexString());
      expect(res.body.results[1].id).toBe(userOne._id.toHexString());
      expect(res.body.results[2].id).toBe(userTwo._id.toHexString());
    });

    it('should limit returned array if limit param is specified', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ limit: 2 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
    });

    it('should return the correct page if page and limit params are specified', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ page: 2, limit: 2 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(admin._id.toHexString());
    });
  });

  describe('[GET] /api/user/profile', () => {
    it('should return 200 and apply the default query options', async () => {
      await insertUsers([userOne, userTwo, admin]);
      await saveAdminToken(adminRefreshToken);

      const res = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        email: admin.email,
        id: admin._id.toString(),
        name: admin.name,
        role: admin.role
      });
    });

    it('should return 401 if access token is missing', async () => {
      await insertUsers([userOne, userTwo, admin]);

      await request(app)
        .get('/api/user/profile')
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('[PUT] - /api/user/profile', () => {
    it('should return 200 and successfully update user profile', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      const updateBody = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'newPassword1',
        avatar: null
      };

      const res = await request(app)
        .put('/api/user/profile')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).toStrictEqual({
        id: admin._id.toHexString(),
        name: updateBody.name,
        email: updateBody.email,
        avatar: updateBody.avatar,
        role: 'admin'
      });
    });
  });

  describe('[DELETE] /api/user/logout/:refreshToken', () => {
    it('should delete the refresh token for user', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const res = await request(app)
        .delete(`/api/user/logout/${userOneRefreshToken}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      expect(res.body).toStrictEqual({});
    });

    it('should return 401 if access token is missing', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const res = await request(app)
        .delete(`/api/user/logout/${userOneRefreshToken}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toStrictEqual({
        status: 401,
        message: 'Authentication required!'
      });
    });

    it('should return 401 if user does not exist but the token does', async () => {
      await saveTokens(userOneRefreshToken);

      const res = await request(app)
        .delete(`/api/user/logout/${userOneRefreshToken}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toStrictEqual({
        status: 401,
        message: 'Authentication required!'
      });
    });

    it('should return 500 if token does not exist but user does', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const res = await request(app)
        .delete(`/api/user/logout/${userOneAccessToken}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);

      expect(res.body).toStrictEqual({
        status: 404,
        message: 'Token not found'
      });
    });
  });

  describe('[GET] - /api/user/:userId', () => {
    it('should return 200 and the user object if data is ok', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const res = await request(app)
        .get(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toStrictEqual({
        id: userOne._id.toHexString(),
        email: userOne.email,
        name: userOne.name,
        role: userOne.role
      });
    });

    it('should return 401 error if access token is missing', async () => {
      await insertUsers([userOne]);

      await request(app).get(`/api/user/${userOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 403 error if user is trying to get another user', async () => {
      await insertUsers([userOne, userTwo]);
      await saveTokens(userOneRefreshToken);

      await request(app)
        .get(`/api/user/${userTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    it('should return 200 and the user object if admin is trying to get another user', async () => {
      await insertUsers([userOne, admin]);
      await saveAdminToken(adminRefreshToken);

      await request(app)
        .get(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
    });

    it('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      await request(app)
        .get('/api/user/invalidId')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 404 error if user is not found', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      await request(app)
        .get(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('[DELETE] - /api/user/:userId', () => {
    it('should return 204 if data is ok', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      await request(app)
        .delete(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbUser = await User.findById(userOne._id);

      expect(dbUser).toBeNull();
    });

    it('should return 401 error if access token is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/api/user/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 403 error if user is trying to delete another user', async () => {
      await insertUsers([userOne, userTwo]);
      await saveTokens(userOneRefreshToken);

      await request(app)
        .delete(`/api/user/${userTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    it('should return 204 if admin is trying to delete another user', async () => {
      await insertUsers([userOne, admin]);
      await saveAdminToken(adminRefreshToken);

      await request(app)
        .delete(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);
    });

    it('should return 400 error if userId is not a valid id', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      await request(app)
        .delete('/api/user/invalidId')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 404 error if user already is not found', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      await request(app)
        .delete(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('[PATCH] - /api/user/:userId', () => {
    it('should return 200 and successfully update user if data is ok', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const updateBody = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'newPassword1'
      };

      const res = await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toStrictEqual({
        id: userOne._id.toHexString(),
        name: updateBody.name,
        email: updateBody.email,
        role: 'user'
      });

      const dbUser = await User.findById(userOne._id);

      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(updateBody.password);
      expect(dbUser).toMatchObject({ name: updateBody.name, email: updateBody.email, role: 'user' });
    });

    it('should return 401 error if access token is missing', async () => {
      await insertUsers([userOne]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .send(updateBody).expect(httpStatus.UNAUTHORIZED);
    });

    it('should return 403 if user is updating another user', async () => {
      await insertUsers([userOne, userTwo]);
      await saveTokens(userOneRefreshToken);

      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/api/user/${userTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.FORBIDDEN);
    });

    it('should return 200 and successfully update user if admin is updating another user', async () => {
      await insertUsers([userOne, admin]);
      await saveAdminToken(adminRefreshToken);

      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);
    });

    it('should return 404 if admin is updating another user that is not found', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND);
    });

    it('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([admin]);
      await saveAdminToken(adminRefreshToken);

      const updateBody = { name: faker.name.findName() };

      await request(app)
        .patch('/api/user/invalidId')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 if email is invalid', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const updateBody = { email: 'invalidEmail' };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 if email is already taken', async () => {
      await insertUsers([userOne, userTwo]);
      await saveTokens(userOneRefreshToken);

      const updateBody = { email: userTwo.email };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should not return 400 if email is my email', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const updateBody = { email: userOne.email };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);
    });

    it('should return 400 if password length is less than 8 characters', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const updateBody = { password: 'passwo1' };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return 400 if password does not contain both letters and numbers', async () => {
      await insertUsers([userOne]);
      await saveTokens(userOneRefreshToken);

      const updateBody = { password: 'password' };

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);

      updateBody.password = '11111111';

      await request(app)
        .patch(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
