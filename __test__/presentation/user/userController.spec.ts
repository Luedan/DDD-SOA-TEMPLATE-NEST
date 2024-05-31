import { It, Mock } from 'moq.ts';
import { UserController } from '../../../src/presentation/controllers/user/user.controller';
import { FindAllUser } from '../../../src/application/useCases/user/findAllUser.service';
import { FindOneUser } from '../../../src/application/useCases/user/findOneUser.service';
import { UpdateUser } from '../../../src/application/useCases/user/updateUser.service';
import { DeleteUser } from '../../../src/application/useCases/user/deleteUser.service';
import { UserResponseMock } from '../../mocks/userMocks';
import { CreateUser } from '../../../src/application/useCases/user/createUser.service';

describe('UserController', () => {
  let userController: UserController;

  // Mocks
  const createUser = new Mock<CreateUser>();
  const findAllUser = new Mock<FindAllUser>();
  const findOneUser = new Mock<FindOneUser>();
  const updateUser = new Mock<UpdateUser>();
  const deleteUser = new Mock<DeleteUser>();

  beforeEach(async () => {
    userController = new UserController(
      createUser.object(),
      updateUser.object(),
      findAllUser.object(),
      findOneUser.object(),
      deleteUser.object(),
    );
  });

  it('Create User', async () => {
    // Arrange
    createUser
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(UserResponseMock));

    // Act
    const result = await userController.create(It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });

  it('Find All User', async () => {
    // Arrange
    findAllUser
      .setup((i) => i.handle())
      .returns(Promise.resolve([UserResponseMock]));

    // Act
    const result = await userController.findAll();

    // Assert
    expect(result).toEqual([UserResponseMock]);
  });

  it('Find One User', async () => {
    // Arrange
    findOneUser
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(UserResponseMock));

    // Act
    const result = await userController.findOne(It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });

  it('Update User', async () => {
    // Arrange
    updateUser
      .setup((i) => i.handle(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(UserResponseMock));

    // Act
    const result = await userController.update(It.IsAny(), It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });

  it('Delete User', async () => {
    // Arrange
    deleteUser
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(UserResponseMock));

    // Act
    const result = await userController.delete(It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });
});
