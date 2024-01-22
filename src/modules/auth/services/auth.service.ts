import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { IUserAcessToken } from 'src/modules/user/interfaces/user-token.interface';
import { IAuthService } from '../interfaces/auth.service.interface';
import { ISigninAuth } from '../entities/signin';
import { ISignupAuth } from '../entities/signup';

import { UserRepository } from '../../../database/repositories/users.repositories';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signin(signinAuth: ISigninAuth): Promise<IUserAcessToken> {
    const { email, password } = signinAuth;

    const user = await this.usersRepository.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupAuth: ISignupAuth): Promise<IUserAcessToken> {
    const { name, email, password } = signupAuth;
    const emailTaken = await this.usersRepository.findUnique({
      where: {
        email,
      },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = await this.generateAccessToken(user.id);
    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
