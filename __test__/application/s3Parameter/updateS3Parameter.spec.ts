import { Mapper } from '@automapper/core';
import { Mock, It } from 'moq.ts';
import { NotFoundException } from '@nestjs/common';
import { UpdateS3Parameter } from '../../../src/application/useCases/parameters/s3/updateS3Parameter.service';
import { S3ParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/s3/s3Parameter.repository';
import { FindOneS3Parameter } from '../../../src/application/useCases/parameters/s3/findOneS3Parameter.service';
import { S3ParameterUpdateDto } from '../../../src/domain/parameters/s3/dto/s3Parameter-update.dto';
import { S3Parameter } from '../../../src/domain/parameters/s3/s3Parameter.entity';
import { S3ParameterResponseDto } from '../../../src/domain/parameters/s3/dto/s3Parameter-response.dto';
import {
  S3ParameterMock,
  S3ParameterResponseMock,
} from '../../mocks/s3ParameterMocks';

describe('Update S3Parameter', () => {
  let updateS3Parameter: UpdateS3Parameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const s3ParameterRepositoryMock = new Mock<S3ParameterRepository>();
  const findOneMock = new Mock<FindOneS3Parameter>();

  beforeEach(() => {
    updateS3Parameter = new UpdateS3Parameter(
      mapperMock.object(),
      s3ParameterRepositoryMock.object(),
      findOneMock.object(),
    );
  });

  it('should update a s3Parameter', async () => {
    // Arrange
    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), S3ParameterUpdateDto, S3Parameter),
      )
      .returns(S3ParameterMock);

    findOneMock
      .setup((findOne) => findOne.handle(It.IsAny()))
      .returns(Promise.resolve(S3ParameterResponseMock));

    s3ParameterRepositoryMock
      .setup((s3ParameterRepository) =>
        s3ParameterRepository.update(It.IsAny(), It.IsAny()),
      )
      .returns(Promise.resolve(S3ParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), S3Parameter, S3ParameterResponseDto),
      )
      .returns(S3ParameterResponseMock);
    // Act
    const result = await updateS3Parameter.handle(It.IsAny(), It.IsAny());
    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });

  it('should throw an error if s3Parameter is not found', async () => {
    // Arrange
    findOneMock
      .setup((findOne) => findOne.handle(It.IsAny()))
      .returns(Promise.resolve(null));

    // Act & Assert
    await expect(
      updateS3Parameter.handle(It.IsAny(), It.IsAny()),
    ).rejects.toThrow(NotFoundException);
  });
});
