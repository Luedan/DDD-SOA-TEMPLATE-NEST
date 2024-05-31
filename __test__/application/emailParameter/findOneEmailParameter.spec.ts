import { Mapper } from '@automapper/core';
import { It, Mock } from 'moq.ts';
import { FindOneEmailParameter } from '../../../src/application/useCases/parameters/email/findOneEmailParameter.service';
import { EmailParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/email/emailParameter.repository';
import { EmailParameter } from '../../../src/domain/parameters/email/emailParameter.entity';
import { EmailParameterResponseDto } from '../../../src/domain/parameters/email/dto/emailParameter-response.dto';

import {
  EmailParameterMock,
  EmailParameterResponseMock,
} from '../../mocks/emailParameterMocks';

describe('Find One EmailParameter', () => {
  let findOneEmailParameter: FindOneEmailParameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const emailParameterRepositoryMock = new Mock<EmailParameterRepository>();

  beforeEach(() => {
    findOneEmailParameter = new FindOneEmailParameter(
      mapperMock.object(),
      emailParameterRepositoryMock.object(),
    );
  });

  it('should return a emailParameter', async () => {
    // Arrange
    emailParameterRepositoryMock
      .setup((emailParameterRepository) =>
        emailParameterRepository.findBy(It.IsAny()),
      )
      .returns(Promise.resolve(EmailParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), EmailParameter, EmailParameterResponseDto),
      )
      .returns(EmailParameterResponseMock);

    // Act
    const result = await findOneEmailParameter.handle(It.IsAny());

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });
});
