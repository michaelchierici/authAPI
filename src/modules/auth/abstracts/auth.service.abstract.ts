import { ISigninAuth } from '../entities/signin';
import { IAuthService } from '../interfaces/auth.service.interface';
import { ISignupAuth } from '../entities/signup';
import { IUserAcessToken } from 'src/modules/user/interfaces/user-token.interface';

export abstract class AAuthService implements IAuthService {
  abstract signin(signinAuth: ISigninAuth): Promise<IUserAcessToken>;
  abstract signup(signupAuth: ISignupAuth): Promise<IUserAcessToken>;
}
