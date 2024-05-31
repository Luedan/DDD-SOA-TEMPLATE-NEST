import { It, Mock } from 'moq.ts';
import { SecurityController } from '../../../src/presentation/controllers/security/security.controller';
import { Login } from '../../../src/application/useCases/security/login.service';
import { ValidateToken } from '../../../src/application/useCases/security/validateToken.service';
import { RefreshToken } from '../../../src/application/useCases/security/refreshToken.service';
import { GetTokenData } from '../../../src/application/useCases/security/getTokenData.service';
import { LoginResponseMock, TokenDataMock } from '../../mocks/securityMocks';

describe('SecurityController', () => {
  let securityController: SecurityController;

  // Mocks
  const login = new Mock<Login>();
  const validate = new Mock<ValidateToken>();
  const refreshToken = new Mock<RefreshToken>();
  const getTokenData = new Mock<GetTokenData>();

  beforeEach(async () => {
    securityController = new SecurityController(
      login.object(),
      getTokenData.object(),
      refreshToken.object(),
      validate.object(),
    );
  });

  it('Login', async () => {
    // Arrange
    login
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(LoginResponseMock));

    // Act
    const result = await securityController.login(It.IsAny());

    // Assert
    expect(result).toEqual(LoginResponseMock);
  });

  it('Validate Token', async () => {
    // Arrange
    validate.setup((i) => i.handle(It.IsAny())).returns(true);

    // Act
    const result = await securityController.validateToken(It.IsAny());

    // Assert
    expect(result).toEqual(true);
  });

  it('Refresh Token', async () => {
    // Arrange
    refreshToken.setup((i) => i.handle(It.IsAny())).returns('token');

    // Act
    const result = await securityController.refreshToken(It.IsAny());

    // Assert
    expect(result).toEqual('token');
  });

  it('Get Token Data', async () => {
    // Arrange
    getTokenData.setup((i) => i.handle(It.IsAny())).returns(TokenDataMock);

    // Act
    const result = await securityController.getTokenData(It.IsAny());

    // Assert
    expect(result).toEqual(TokenDataMock);
  });
});
