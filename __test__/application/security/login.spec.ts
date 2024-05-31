import { JwtService } from '@nestjs/jwt';
import { It, Mock } from 'moq.ts';
import { UserRepository } from '../../../src/infrastructure/persistence/repositories/user/user.repository';
import { Login } from '../../../src/application/useCases/security/login.service';
import { UserMock } from '../../mocks/userMocks';
import { LoginRequestMock, LoginResponseMock } from '../../mocks/securityMocks';

describe('Login', () => {
  let login: Login;

  // Mocks
  const userRepositoryMock = new Mock<UserRepository>();
  const jwtServiceMock = new Mock<JwtService>();

  beforeEach(() => {
    login = new Login(userRepositoryMock.object(), jwtServiceMock.object());
  });

  it('should login a user', async () => {
    // Arrange
    userRepositoryMock
      .setup((userRepository) => userRepository.findBy(It.IsAny()))
      .returns(Promise.resolve(UserMock));

    jwtServiceMock
      .setup((jwtService) => jwtService.sign(It.IsAny()))
      .returns('token');

    // Act
    const result = await login.handle(LoginRequestMock);
    console.log(result);
    // Assert
    expect(result).toEqual(LoginResponseMock);
  });

  it('should throw an error if user is not found', async () => {
    // Arrange
    userRepositoryMock
      .setup((userRepository) => userRepository.findBy(It.IsAny()))
      .returns(Promise.resolve(null));

    // Act
    const result = await login.handle(LoginRequestMock);
    // Assert
    expect(result).toEqual({ token: null });
  });

  it('should throw an error if password is incorrect', async () => {
    // Arrange
    userRepositoryMock
      .setup((userRepository) => userRepository.findBy(It.IsAny()))
      .returns(Promise.resolve(UserMock));

    // Act
    const result = await login.handle({
      ...LoginRequestMock,
      password: 'wrong',
    });
    // Assert
    expect(result).toEqual({ token: null });
  });
});
