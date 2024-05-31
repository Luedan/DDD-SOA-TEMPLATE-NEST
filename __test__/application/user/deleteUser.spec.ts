import { It, Mock } from 'moq.ts';
import { Mapper } from '@automapper/core';
import { DeleteUser } from '../../../src/application/useCases/user/deleteUser.service';
import { UserRepository } from '../../../src/infrastructure/persistence/repositories/user/user.repository';
import { UserMock, UserResponseMock } from '../../mocks/userMocks';
import { User } from '../../../src/domain/user/user.entity';
import { UserResponseDto } from '../../../src/domain/user/dto/user-response.dto';

describe('Delete User', () => {
  let deleteUser: DeleteUser;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const userRepositoryMock = new Mock<UserRepository>();

  beforeEach(() => {
    deleteUser = new DeleteUser(
      mapperMock.object(),
      userRepositoryMock.object(),
    );
  });

  it('should delete a user', async () => {
    // Arrange
    userRepositoryMock
      .setup((userRepository) => userRepository.delete(It.IsAny()))
      .returns(Promise.resolve(UserMock));

    mapperMock
      .setup((mapper) => mapper.map(It.IsAny(), User, UserResponseDto))
      .returns(UserResponseMock);

    // Act
    const result = await deleteUser.handle(It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });
});
