import { It, Mock } from 'moq.ts';
import { Mapper } from '@automapper/core';
import { DeleteEmailParameter } from '../../../src/application/useCases/parameters/email/deleteEmailParameter.service';
import { EmailParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/email/emailParameter.repository';
import { EmailParameter } from '../../../src/domain/parameters/email/emailParameter.entity';
import { EmailParameterResponseDto } from '../../../src/domain/parameters/email/dto/emailParameter-response.dto';
import {
  EmailParameterMock,
  EmailParameterResponseMock,
} from '../../mocks/emailParameterMocks';

describe('Delete EmailParameter', () => {
  let deleteEmailParameter: DeleteEmailParameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const emailParameterRepositoryMock = new Mock<EmailParameterRepository>();

  beforeEach(() => {
    deleteEmailParameter = new DeleteEmailParameter(
      mapperMock.object(),
      emailParameterRepositoryMock.object(),
    );
  });

  it('should delete a emailParameter', async () => {
    // Arrange
    emailParameterRepositoryMock
      .setup((emailParameterRepository) =>
        emailParameterRepository.delete(It.IsAny()),
      )
      .returns(Promise.resolve(EmailParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), EmailParameter, EmailParameterResponseDto),
      )
      .returns(EmailParameterResponseMock);

    // Act
    const result = await deleteEmailParameter.handle(It.IsAny());

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });
});
