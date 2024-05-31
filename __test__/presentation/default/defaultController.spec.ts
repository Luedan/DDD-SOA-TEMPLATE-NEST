import { DefaultController } from '@app/presentation/controllers/default/default.controller';

describe('DefaultController', () => {
  it('home', () => {
    // Arrange
    const defaultController = new DefaultController();

    // Act
    const result = defaultController.home();

    // Assert
    expect(result).toEqual('Hello World!');
  });
});
