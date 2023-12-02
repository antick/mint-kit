const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const BadRequestError = require('../../../middlewares/errors/BadRequestError');
const NotFoundError = require('../../../middlewares/errors/NotFoundError');
const User = require('../models/user.model');

const unlinkAsync = promisify(fs.unlink);

const isEmailTaken = async function (email, excludeUserId = null) {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });

  return !!user;
};

const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new BadRequestError('Email already taken');
  }

  return User.create(userBody);
};

const updateProfile = async (userId, userBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  if (user.avatar && !userBody.avatar) {
    const avatarPath = path.join(__dirname, `../../../public/uploads/${user.avatar}`);

    await unlinkAsync(avatarPath);
  }

  if (!userBody.password) {
    delete userBody.password;
  }

  Object.assign(user, userBody);

  await user.save();

  return user;
};

const queryUsers = async (filter, options) => User.paginate(filter, options);

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  if (updateBody.email && (await isEmailTaken(updateBody.email, userId))) {
    throw new BadRequestError('Email already taken');
  }

  Object.assign(user, updateBody);

  await user.save();

  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  await user.remove();

  return user;
};

module.exports = {
  deleteUserById,
  updateUserById,
  getUserByEmail,
  updateProfile,
  getUserById,
  createUser,
  queryUsers,
};
