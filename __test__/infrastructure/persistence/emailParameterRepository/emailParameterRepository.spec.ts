import { It, Mock } from 'moq.ts';
import { AppContext } from '../../../../src/infrastructure/persistence/context/appContext.service';
import {
  EmailParameterMock,
  EmailParameterMockArray,
} from '../../../mocks/emailParameterMocks';
import {
  ErrorWithoutStatus,
  FakeInsertResult,
  FakeUpdateResult,
} from '../../../mocks/resultsMocks';
import { HttpException } from '@nestjs/common';
import { EmailParameterRepository } from '../../../../src/infrastructure/persistence/repositories/parameters/email/emailParameter.repository';

describe('EmailParameterRepository', () => {
  let emailParameterRepository: EmailParameterRepository;

  // Mocks
  const appContext = new Mock<AppContext>();

  beforeEach(() => {
    emailParameterRepository = new EmailParameterRepository(
      appContext.object(),
    );
  });

  // Success cases

  it('Create a new emailParameter', async () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.create(It.IsAny()))
      .returns(Promise.resolve(FakeInsertResult(EmailParameterMock)));

    // Act
    const result = emailParameterRepository.create(EmailParameterMock);

    // Assert
    expect(result).resolves.toEqual(EmailParameterMock);
  });

  it('Get all emailParameters', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.getAll(It.IsAny()))
      .returns(Promise.resolve(EmailParameterMockArray));

    // Act
    const result = emailParameterRepository.getAll(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(EmailParameterMockArray);
  });

  it('Get emailParameter by id', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.getOne(It.IsAny()))
      .returns(Promise.resolve(EmailParameterMock));

    // Act
    const result = emailParameterRepository.findBy(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(EmailParameterMock);
  });

  it('Update a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.emailParameter.update(It.IsAny(), It.IsAny()),
      )
      .returns(Promise.resolve(FakeUpdateResult(EmailParameterMock)));

    // Act
    const result = emailParameterRepository.update(
      It.IsAny(),
      EmailParameterMock,
    );

    // Assert
    expect(result).resolves.toEqual(EmailParameterMock);
  });

  it('Delete a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.delete(It.IsAny()))
      .returns(Promise.resolve(FakeUpdateResult(EmailParameterMock)));

    // Act
    const result = emailParameterRepository.delete(It.IsAny());

    // Assert
    expect(result).resolves.toEqual(EmailParameterMock);
  });

  it('Save a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.emailParameter.save(It.IsAny(), It.IsAny()),
      )
      .returns(Promise.resolve(EmailParameterMock));

    // Act
    const result = emailParameterRepository.save(It.IsAny(), It.IsAny());

    // Assert
    expect(result).resolves.toEqual(EmailParameterMock);
  });

  // Error cases
  it('Should throw an error when trying to create a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.create(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = emailParameterRepository.create(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to get all emailParameters', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.getAll(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = emailParameterRepository.getAll(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to get a emailParameter by id', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.getOne(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = emailParameterRepository.findBy(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to update a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.emailParameter.update(It.IsAny(), It.IsAny()),
      )
      .throws(ErrorWithoutStatus);

    // Act
    const result = emailParameterRepository.update(
      It.IsAny(),
      EmailParameterMock,
    );

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to delete a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) => appContext.emailParameter.delete(It.IsAny()))
      .throws(ErrorWithoutStatus);

    // Act
    const result = emailParameterRepository.delete(It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });

  it('Should throw an error when trying to save a emailParameter', () => {
    // Arrange
    appContext
      .setup((appContext) =>
        appContext.emailParameter.save(It.IsAny(), It.IsAny()),
      )
      .throws(ErrorWithoutStatus);

    // Act
    const result = emailParameterRepository.save(It.IsAny(), It.IsAny());

    // Assert
    expect(result).rejects.toThrow(
      new HttpException('Error de DB: Error', 500),
    );
  });
});
