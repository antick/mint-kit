import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne(userId);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll({});
  }
}
