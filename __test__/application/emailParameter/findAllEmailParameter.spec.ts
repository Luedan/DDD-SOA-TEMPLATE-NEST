import { Mock } from 'moq.ts';
import { Mapper } from '@automapper/core';
import { FindAllEmailParameter } from '../../../src/application/useCases/parameters/email/findAllEmailParameter.service';
import { EmailParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/email/emailParameter.repository';
import { EmailParameter } from '../../../src/domain/parameters/email/emailParameter.entity';
import { EmailParameterResponseDto } from '../../../src/domain/parameters/email/dto/emailParameter-response.dto';

import {
  EmailParameterMockArray,
  EmailParameterResponseMockArray,
} from '../../mocks/emailParameterMocks';

describe('Find All EmailParameter', () => {
  let findAllEmailParameter: FindAllEmailParameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const emailParameterRepositoryMock = new Mock<EmailParameterRepository>();

  beforeEach(() => {
    findAllEmailParameter = new FindAllEmailParameter(
      mapperMock.object(),
      emailParameterRepositoryMock.object(),
    );
  });

  it('should return all emailParameters', async () => {
    // Arrange
    emailParameterRepositoryMock
      .setup((emailParameterRepository) => emailParameterRepository.getAll())
      .returns(Promise.resolve(EmailParameterMockArray));

    mapperMock
      .setup((mapper) =>
        mapper.mapArray(
          EmailParameterMockArray,
          EmailParameter,
          EmailParameterResponseDto,
        ),
      )
      .returns(EmailParameterResponseMockArray);

    // Act
    const result = await findAllEmailParameter.handle();

    // Assert
    expect(result).toEqual(EmailParameterResponseMockArray);
  });
});
