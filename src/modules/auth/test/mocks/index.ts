import { JwtService } from '@nestjs/jwt';

export const mockToken = { accessToken: 'mockedAccessToken' };
export const mockUserToBeCreated = {
  name: 'Teste',
  email: 'teste@dev.com',
  password: '12345678',
};

export const mockExistedUser = {
  email: 'teste@dev.com',
  password: '12345678',
};

export const mockUserRepository = {
  create: jest.fn().mockResolvedValue({ ...mockUserToBeCreated, id: 1 }),
  findUnique: jest.fn().mockResolvedValue(mockExistedUser),
};

export const mockJwtModule = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(mockToken.accessToken),
  },
};
