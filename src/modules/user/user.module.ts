import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AUserService } from './abstracts/user.service.abstract';

@Module({
  controllers: [UserController],
  providers: [{ provide: AUserService, useClass: UserService }],
})
export class UserModule {}
