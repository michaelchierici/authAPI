import { UserEntity } from '../entities/user';

export interface IUserService {
  getUserById(userId: string): Promise<UserEntity>;
}
