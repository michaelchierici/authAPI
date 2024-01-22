import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../../database/database.module';
import { AuthModule } from '../auth.module';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { PrismaService } from '../../../database/prisma.service';
import { UserRepository } from '../../../database/repositories/users.repositories';
import * as bcryptjs from 'bcryptjs';
import {
  mockExistedUser,
  mockJwtModule,
  mockToken,
  mockUserRepository,
  mockUserToBeCreated,
} from './mocks';

describe('AuthService', () => {
  let service: AuthService;
  let jwt: JwtService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        UserRepository,
        mockJwtModule,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
      imports: [AuthModule, DatabaseModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
    repository = module.get<UserRepository>(UserRepository);
  });

  jest.spyOn(bcryptjs, 'compare').mockImplementation(async () => true);

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(jwt).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('signin', () => {
    it('should signin a user and return an access token', async () => {
      jest.spyOn(jwt, 'signAsync').mockResolvedValue(mockToken.accessToken);
      const response = await service.signin(mockExistedUser);

      expect(response).toEqual({ accessToken: mockToken.accessToken });
      expect(bcryptjs.compare).toHaveBeenCalledWith(
        mockExistedUser.password,
        mockExistedUser.password,
      );
    });
  });

  describe('signup', () => {
    it('should create a user and return an access token', async () => {
      const response = await service.signup(mockUserToBeCreated);
      jest.spyOn(jwt, 'signAsync').mockResolvedValue(mockToken.accessToken);

      expect(response).toEqual({ accessToken: mockToken.accessToken });
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        mockUserToBeCreated,
      );
    });
  });
});
