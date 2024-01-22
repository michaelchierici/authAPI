import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IsPublic } from '../../../shared/decorators/IsPublic';
import { IAuthService } from '../interfaces/auth.service.interface';
import { AAuthService } from '../abstracts/auth.service.abstract';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { IUserAcessToken } from '../../user/interfaces/user-token.interface';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AAuthService) private readonly authService: IAuthService,
  ) {}

  @Post('/signin')
  signin(@Body() signinDto: SigninDto): Promise<IUserAcessToken> {
    return this.authService.signin(signinDto);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<IUserAcessToken> {
    return this.authService.signup(signupDto);
  }
}
