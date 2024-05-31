import { Mapper } from '@automapper/core';
import { CreateUser } from '../../../src/application/useCases/user/createUser.service';
import { It, Mock } from 'moq.ts';
import { UserRepository } from '../../../src/infrastructure/persistence/repositories/user/user.repository';
import { UserRequestDto } from '../../../src/domain/user/dto/user-request.dto';
import { User } from '../../../src/domain/user/user.entity';
import { UserMock, UserResponseMock } from '../../mocks/userMocks';
import { UserResponseDto } from '../../../src/domain/user/dto/user-response.dto';

describe('Create User', () => {
  let createUser: CreateUser;

  // Mocks
  const mapperMock = new Mock<Mapper>();

  const userRepositoryMock = new Mock<UserRepository>();

  beforeEach(() => {
    createUser = new CreateUser(
      mapperMock.object(),
      userRepositoryMock.object(),
    );
  });

  it('should create a user', async () => {
    // Arrange
    mapperMock
      .setup((mapper) => mapper.map(It.IsAny(), UserRequestDto, User))
      .returns(UserMock);

    userRepositoryMock
      .setup((userRepository) => userRepository.create(It.IsAny()))
      .returns(Promise.resolve(UserMock));

    mapperMock
      .setup((mapper) => mapper.map(It.IsAny(), User, UserResponseDto))
      .returns(UserResponseMock);

    // Act
    const result = await createUser.handle(It.IsAny());

    // Assert
    expect(result).toEqual(UserResponseMock);
  });
});
