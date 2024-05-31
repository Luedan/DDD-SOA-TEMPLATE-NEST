import { Mapper } from '@automapper/core';
import { It, Mock } from 'moq.ts';
import { FindOneUser } from '../../../src/application/useCases/user/findOneUser.service';
import { UserRepository } from '../../../src/infrastructure/persistence/repositories/user/user.repository';
import { UserMock, UserResponseMock } from '../../mocks/userMocks';
import { User } from '../../../src/domain/user/user.entity';
import { UserResponseDto } from '../../../src/domain/user/dto/user-response.dto';

describe('Find One User', () => {
  let findOneUser: FindOneUser;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const userRepositoryMock = new Mock<UserRepository>();

  beforeEach(() => {
    findOneUser = new FindOneUser(
      mapperMock.object(),
      userRepositoryMock.object(),
    );
  });

  it('should return a user', async () => {
    // Arrange
    userRepositoryMock
      .setup((userRepository) => userRepository.findBy(It.IsAny()))
      .returns(Promise.resolve(UserMock));

    mapperMock
      .setup((mapper) => mapper.map(It.IsAny(), User, UserResponseDto))
      .returns(UserResponseMock);

    // Act
    const result = await findOneUser.handle(It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });
});
