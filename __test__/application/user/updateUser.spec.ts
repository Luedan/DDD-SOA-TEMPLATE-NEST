import { Mapper } from '@automapper/core';
import { UpdateUser } from '../../../src/application/useCases/user/updateUser.service';
import { Mock, It } from 'moq.ts';
import { UserRepository } from '../../../src/infrastructure/persistence/repositories/user/user.repository';
import { FindOneUser } from '../../../src/application/useCases/user/findOneUser.service';
import { UserUpdateDto } from '../../../src/domain/user/dto/user-update.dto';
import { User } from '../../../src/domain/user/user.entity';
import { UserMock, UserResponseMock } from '../../mocks/userMocks';
import { UserResponseDto } from '../../../src/domain/user/dto/user-response.dto';
import { NotFoundException } from '@nestjs/common';

describe('Update User', () => {
  let updateUser: UpdateUser;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const userRepositoryMock = new Mock<UserRepository>();
  const findOneMock = new Mock<FindOneUser>();

  beforeEach(() => {
    updateUser = new UpdateUser(
      mapperMock.object(),
      userRepositoryMock.object(),
      findOneMock.object(),
    );
  });

  it('should update a user', async () => {
    // Arrange
    mapperMock
      .setup((mapper) => mapper.map(It.IsAny(), UserUpdateDto, User))
      .returns(UserMock);

    findOneMock
      .setup((findOne) => findOne.handle(It.IsAny()))
      .returns(Promise.resolve(UserResponseMock));

    userRepositoryMock
      .setup((userRepository) => userRepository.update(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(UserMock));

    mapperMock
      .setup((mapper) => mapper.map(It.IsAny(), User, UserResponseDto))
      .returns(UserResponseMock);
    // Act
    const result = await updateUser.handle(It.IsAny(), It.IsAny());
    // Assert
    expect(result).toEqual(UserResponseMock);
  });

  it('should throw an error if user is not found', async () => {
    // Arrange
    findOneMock
      .setup((findOne) => findOne.handle(It.IsAny()))
      .returns(Promise.resolve(null));

    // Act & Assert
    await expect(updateUser.handle(It.IsAny(), It.IsAny())).rejects.toThrow(
      NotFoundException,
    );
  });
});
