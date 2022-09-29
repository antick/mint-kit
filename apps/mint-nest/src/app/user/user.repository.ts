import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilterQuery);
  }

  async findOne(userId: string): Promise<User | undefined> {
    return this.userModel.findOne({ userId });
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOneAndUpdate(userId: string, user: User): Promise<User | undefined> {
    return this.userModel.findOneAndUpdate({ userId }, user, { new: true });
  }
}
