import { JwtService } from '@nestjs/jwt';
import { It, Mock } from 'moq.ts';
import { ValidateToken } from '../../../src/application/useCases/security/validateToken.service';

describe('Validate Token', () => {
  let validateToken: ValidateToken;

  // Mocks
  const jwtServiceMock = new Mock<JwtService>();

  beforeEach(() => {
    validateToken = new ValidateToken(jwtServiceMock.object());
  });

  it('should return true', () => {
    // Arrange
    jwtServiceMock
      .setup((jwtService) => jwtService.verify(It.IsAny()))
      .returns('token');

    // Act
    const result = validateToken.handle('token');

    // Assert
    expect(result).toEqual(true);
  });

  it('should return false', () => {
    // Arrange
    jwtServiceMock
      .setup((jwtService) => jwtService.verify(It.IsAny()))
      .throws(new Error());

    // Act
    const result = validateToken.handle('token');

    // Assert
    expect(result).toEqual(false);
  });
});
