import { It, Mock } from 'moq.ts';
import { UserRepository } from '../../../../src/infrastructure/persistence/repositories/user/user.repository';
import { AppContext } from '../../../../src/infrastructure/persistence/context/appContext.service';
import { UserMock, UserMockArray } from '../../../mocks/userMocks';
import {
  ErrorWithoutStatus,
  FakeInsertResult,
  FakeUpdateResult,
} from '../../../mocks/resultsMocks';
import { HttpException } from '@nestjs/common';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  // Mocks
  const appContext = new Mock<AppContext>();

  beforeEach(() => {
    userRepository = new UserRepository(appContext.object());
  });

  // Success cases

  it('Create a new user', async () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.create(It.IsAny()))
      .returns(Promise.resolve(FakeInsertResult(UserMock)));

    // Act
    const result = userRepository.create(UserMock);

    // Assert
    expect(result).resolves.toEqual(UserMock);
  });

  it('Get all users', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.getAll(It.IsAny()))
      .returns(Promise.resolve(UserMockArray));

    // Act
    const result = userRepository.getAll(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(UserMockArray);
  });

  it('Get user by id', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.getOne(It.IsAny()))
      .returns(Promise.resolve(UserMock));

    // Act
    const result = userRepository.findBy(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(UserMock);
  });

  it('Update a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.update(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(FakeUpdateResult(UserMock)));

    // Act
    const result = userRepository.update(It.IsAny(), UserMock);

    // Assert
    expect(result).resolves.toEqual(UserMock);
  });

  it('Delete a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.delete(It.IsAny()))
      .returns(Promise.resolve(FakeUpdateResult(UserMock)));

    // Act
    const result = userRepository.delete(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(UserMock);
  });

  it('Save a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.save(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(UserMock));

    // Act
    const result = userRepository.save(It.IsAny(), It.IsAny());

    // Assert
    expect(result).resolves.toEqual(UserMock);
  });

  // Error cases
  it('Should throw an error when trying to create a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.create(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = userRepository.create(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to get all users', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.getAll(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = userRepository.getAll(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to get a user by id', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.getOne(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = userRepository.findBy(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to update a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.update(It.IsAny(), It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = userRepository.update(It.IsAny(), UserMock);

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to delete a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.delete(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = userRepository.delete(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to save a user', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.user.save(It.IsAny(), It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = userRepository.save(It.IsAny(), It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });
});
