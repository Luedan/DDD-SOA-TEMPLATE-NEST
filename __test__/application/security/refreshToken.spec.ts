import { It, Mock } from 'moq.ts';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../../../src/application/useCases/security/refreshToken.service';

describe('Refresh Token', () => {
  let refreshToken: RefreshToken;

  // Mocks
  const jwtServiceMock = new Mock<JwtService>();

  beforeEach(() => {
    refreshToken = new RefreshToken(jwtServiceMock.object());
  });

  it('should refresh a token', () => {
    // Arrange
    jwtServiceMock
      .setup((jwtService) => jwtService.verify(It.IsAny()))
      .returns('token');
    jwtServiceMock
      .setup((jwtService) => jwtService.sign(It.IsAny()))
      .returns('token');

    // Act
    const result = refreshToken.handle('token');

    // Assert
    expect(result).toEqual(JSON.stringify('token'));
  });

  it('should return null', () => {
    // Arrange
    jwtServiceMock
      .setup((jwtService) => jwtService.verify(It.IsAny()))
      .returns(null);

    // Act
    const result = refreshToken.handle('token');

    // Assert
    expect(result).toEqual(null);
  });
});
