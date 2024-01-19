import { Controller, Get, Inject } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IUserService } from '../interfaces/user.service.interface';
import { AUserService } from '../abstracts/user.service.abstract';

@Controller('users')
export class UserController {
  constructor(
    @Inject(AUserService) private readonly userService: IUserService,
  ) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.userService.getUserById(userId);
  }
}
