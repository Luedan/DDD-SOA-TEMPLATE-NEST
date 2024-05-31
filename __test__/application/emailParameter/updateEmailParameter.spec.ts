import { Mapper } from '@automapper/core';
import { Mock, It } from 'moq.ts';
import { NotFoundException } from '@nestjs/common';
import { UpdateEmailParameter } from '../../../src/application/useCases/parameters/email/updateEmailParameter.service';
import { EmailParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/email/emailParameter.repository';
import { FindOneEmailParameter } from '../../../src/application/useCases/parameters/email/findOneEmailParameter.service';
import { EmailParameterUpdateDto } from '../../../src/domain/parameters/email/dto/emailParameter-update.dto';
import { EmailParameter } from '../../../src/domain/parameters/email/emailParameter.entity';
import { EmailParameterResponseDto } from '../../../src/domain/parameters/email/dto/emailParameter-response.dto';
import {
  EmailParameterMock,
  EmailParameterResponseMock,
} from '../../mocks/emailParameterMocks';

describe('Update EmailParameter', () => {
  let updateEmailParameter: UpdateEmailParameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const emailParameterRepositoryMock = new Mock<EmailParameterRepository>();
  const findOneMock = new Mock<FindOneEmailParameter>();

  beforeEach(() => {
    updateEmailParameter = new UpdateEmailParameter(
      mapperMock.object(),
      emailParameterRepositoryMock.object(),
      findOneMock.object(),
    );
  });

  it('should update a emailParameter', async () => {
    // Arrange
    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), EmailParameterUpdateDto, EmailParameter),
      )
      .returns(EmailParameterMock);

    findOneMock
      .setup((findOne) => findOne.handle(It.IsAny()))
      .returns(Promise.resolve(EmailParameterResponseMock));

    emailParameterRepositoryMock
      .setup((emailParameterRepository) =>
        emailParameterRepository.update(It.IsAny(), It.IsAny()),
      )
      .returns(Promise.resolve(EmailParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), EmailParameter, EmailParameterResponseDto),
      )
      .returns(EmailParameterResponseMock);
    // Act
    const result = await updateEmailParameter.handle(It.IsAny(), It.IsAny());
    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });

  it('should throw an error if emailParameter is not found', async () => {
    // Arrange
    findOneMock
      .setup((findOne) => findOne.handle(It.IsAny()))
      .returns(Promise.resolve(null));

    // Act & Assert
    await expect(
      updateEmailParameter.handle(It.IsAny(), It.IsAny()),
    ).rejects.toThrow(NotFoundException);
  });
});
