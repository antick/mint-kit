import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as faker from 'faker';
import User from '../../models/user.model';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user'
};

const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user'
};

const admin = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin'
};

const insertUsers = async users => {
  await User.insertMany(users.map(user => ({ ...user, password: hashedPassword })));
};

export {
  insertUsers,
  userOne,
  userTwo,
  admin
};
