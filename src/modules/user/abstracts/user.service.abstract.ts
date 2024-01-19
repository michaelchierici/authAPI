import { UserEntity } from '../entities/user';
import { IUserService } from '../interfaces/user.service.interface';

export abstract class AUserService implements IUserService {
  abstract getUserById(userId: string): Promise<UserEntity>;
}
