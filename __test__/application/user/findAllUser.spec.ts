import { Mock } from 'moq.ts';
import { Mapper } from '@automapper/core';
import { UserRepository } from '../../../src/infrastructure/persistence/repositories/user/user.repository';
import { FindAllUser } from '../../../src/application/useCases/user/findAllUser.service';
import { UserMockArray, UserResponseMockArray } from '../../mocks/userMocks';
import { UserResponseDto } from '@app/domain/user/dto/user-response.dto';
import { User } from '../../../src/domain/user/user.entity';

describe('Find All User', () => {
  let findAllUser: FindAllUser;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const userRepositoryMock = new Mock<UserRepository>();

  beforeEach(() => {
    findAllUser = new FindAllUser(
      mapperMock.object(),
      userRepositoryMock.object(),
    );
  });

  it('should return all users', async () => {
    // Arrange
    userRepositoryMock
      .setup((userRepository) => userRepository.getAll())
      .returns(Promise.resolve(UserMockArray));

    mapperMock
      .setup((mapper) => mapper.mapArray(UserMockArray, User, UserResponseDto))
      .returns(UserResponseMockArray);

    // Act
    const result = await findAllUser.handle();

    // Assert
    expect(result).toEqual(UserResponseMockArray);
  });
});
