import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/users.repositories';
import { UserEntity } from '../entities/user';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
