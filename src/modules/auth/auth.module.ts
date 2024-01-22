import { Module } from '@nestjs/common';
import { AAuthService } from './abstracts/auth.service.abstract';

import { JwtModule } from '@nestjs/jwt';
import { env } from '../../config/env';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7d' },
      secret: env.jwtSecret,
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: AAuthService, useClass: AuthService }],
})
export class AuthModule {}
