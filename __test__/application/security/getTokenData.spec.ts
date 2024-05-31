import { JwtService } from '@nestjs/jwt';
import { It, Mock } from 'moq.ts';
import { GetTokenData } from '../../../src/application/useCases/security/getTokenData.service';
import { TokenDataMock } from '../../mocks/securityMocks';

describe('Get token data', () => {
  let getTokenData: GetTokenData;

  // Mocks
  const jwtServiceMock = new Mock<JwtService>();

  beforeEach(() => {
    getTokenData = new GetTokenData(jwtServiceMock.object());
  });

  it('should return token data', () => {
    // Arrange
    jwtServiceMock
      .setup((jwtService) => jwtService.verify(It.IsAny()))
      .returns(TokenDataMock);

    // Act
    const result = getTokenData.handle('token');

    // Assert
    expect(result).toEqual(TokenDataMock);
  });

  it('should return null', () => {
    // Arrange
    jwtServiceMock
      .setup((jwtService) => jwtService.verify(It.IsAny()))
      .throws(new Error());

    // Act
    const result = getTokenData.handle('token');

    // Assert
    expect(result).toEqual(null);
  });
});
