import { Mapper } from '@automapper/core';
import { It, Mock } from 'moq.ts';
import {
  EmailParameterMock,
  EmailParameterResponseMock,
} from '../../mocks/emailParameterMocks';
import { EmailParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/email/emailParameter.repository';
import { CreateEmailParameter } from '../../../src/application/useCases/parameters/email/createEmailParameter.service';
import { EmailParameterRequestDto } from '../../../src/domain/parameters/email/dto/emailParameter-request.dto';
import { EmailParameter } from '../../../src/domain/parameters/email/emailParameter.entity';
import { EmailParameterResponseDto } from '../../../src/domain/parameters/email/dto/emailParameter-response.dto';

describe('Create EmailParameter', () => {
  let createEmailParameter: CreateEmailParameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();

  const emailParameterRepositoryMock = new Mock<EmailParameterRepository>();

  beforeEach(() => {
    createEmailParameter = new CreateEmailParameter(
      mapperMock.object(),
      emailParameterRepositoryMock.object(),
    );
  });

  it('should create a emailParameter', async () => {
    // Arrange
    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), EmailParameterRequestDto, EmailParameter),
      )
      .returns(EmailParameterMock);

    emailParameterRepositoryMock
      .setup((emailParameterRepository) =>
        emailParameterRepository.create(It.IsAny()),
      )
      .returns(Promise.resolve(EmailParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), EmailParameter, EmailParameterResponseDto),
      )
      .returns(EmailParameterResponseMock);

    // Act
    const result = await createEmailParameter.handle(It.IsAny());

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });
});
