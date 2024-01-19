import { IUserAcessToken } from 'src/modules/user/interfaces/user-token.interface';
import { ISigninAuth } from '../entities/signin';
import { ISignupAuth } from '../entities/signup';

export interface IAuthService {
  signin(user: ISigninAuth): Promise<IUserAcessToken>;
  signup(user: ISignupAuth): Promise<IUserAcessToken>;
}
