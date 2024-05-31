import { LoginResponseDto } from '@app/domain/security/dto/login-response.dto';
import { LoginRequestDto } from '../../src/domain/security/dto/login-request.dto';
import { TokenDataResponseDto } from '@app/domain/security/dto/tokenData-response.dto';

export const LoginResponseMock: LoginResponseDto = {
  token: 'token',
};

export const LoginRequestMock: LoginRequestDto = {
  email: 'email',
  password: 'password',
};

export const TokenDataMock: TokenDataResponseDto = {
  email: 'email',
  id: 1,
};
