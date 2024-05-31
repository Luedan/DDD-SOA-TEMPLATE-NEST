import { It, Mock } from 'moq.ts';
import { AppContext } from '../../../../src/infrastructure/persistence/context/appContext.service';
import {
  S3ParameterMock,
  S3ParameterMockArray,
} from '../../../mocks/s3ParameterMocks';
import {
  ErrorWithoutStatus,
  FakeInsertResult,
  FakeUpdateResult,
} from '../../../mocks/resultsMocks';
import { HttpException } from '@nestjs/common';
import { S3ParameterRepository } from '../../../../src/infrastructure/persistence/repositories/parameters/s3/s3Parameter.repository';

describe('S3ParameterRepository', () => {
  let s3ParameterRepository: S3ParameterRepository;

  // Mocks
  const appContext = new Mock<AppContext>();

  beforeEach(() => {
    s3ParameterRepository = new S3ParameterRepository(appContext.object());
  });

  // Success cases

  it('Create a new s3Parameter', async () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.create(It.IsAny()))
      .returns(Promise.resolve(FakeInsertResult(S3ParameterMock)));

    // Act
    const result = s3ParameterRepository.create(S3ParameterMock);

    // Assert
    expect(result).resolves.toEqual(S3ParameterMock);
  });

  it('Get all s3Parameters', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.getAll(It.IsAny()))
      .returns(Promise.resolve(S3ParameterMockArray));

    // Act
    const result = s3ParameterRepository.getAll(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(S3ParameterMockArray);
  });

  it('Get s3Parameter by id', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.getOne(It.IsAny()))
      .returns(Promise.resolve(S3ParameterMock));

    // Act
    const result = s3ParameterRepository.findBy(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(S3ParameterMock);
  });

  it('Update a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.s3Parameter.update(It.IsAny(), It.IsAny()),
      )
      .returns(Promise.resolve(FakeUpdateResult(S3ParameterMock)));

    // Act
    const result = s3ParameterRepository.update(It.IsAny(), S3ParameterMock);

    // Assert
    expect(result).resolves.toEqual(S3ParameterMock);
  });

  it('Delete a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.delete(It.IsAny()))
      .returns(Promise.resolve(FakeUpdateResult(S3ParameterMock)));

    // Act
    const result = s3ParameterRepository.delete(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(S3ParameterMock);
  });

  it('Save a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.s3Parameter.save(It.IsAny(), It.IsAny()),
      )
      .returns(Promise.resolve(S3ParameterMock));

    // Act
    const result = s3ParameterRepository.save(It.IsAny(), It.IsAny());

    // Assert
    expect(result).resolves.toEqual(S3ParameterMock);
  });

  // Error cases
  it('Should throw an error when trying to create a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.create(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = s3ParameterRepository.create(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to get all s3Parameters', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.getAll(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = s3ParameterRepository.getAll(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to get a s3Parameter by id', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.getOne(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = s3ParameterRepository.findBy(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to update a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.s3Parameter.update(It.IsAny(), It.IsAny()),
      )
      .throws(ErrorWithoutStatus);

    // Act
    const result = s3ParameterRepository.update(It.IsAny(), S3ParameterMock);

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to delete a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.s3Parameter.delete(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = s3ParameterRepository.delete(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to save a s3Parameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.s3Parameter.save(It.IsAny(), It.IsAny()),
      )
      .throws(ErrorWithoutStatus);

    // Act
    const result = s3ParameterRepository.save(It.IsAny(), It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });
});
