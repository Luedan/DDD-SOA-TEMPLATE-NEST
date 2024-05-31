import { Mapper } from '@automapper/core';
import { It, Mock } from 'moq.ts';

import {
  S3ParameterMock,
  S3ParameterResponseMock,
} from '../../mocks/s3ParameterMocks';
import { S3ParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/s3/s3Parameter.repository';
import { CreateS3Parameter } from '../../../src/application/useCases/parameters/s3/createS3Parameter.service';
import { S3ParameterRequestDto } from '../../../src/domain/parameters/s3/dto/s3Parameter-request.dto';
import { S3Parameter } from '../../../src/domain/parameters/s3/s3Parameter.entity';
import { S3ParameterResponseDto } from '../../../src/domain/parameters/s3/dto/s3Parameter-response.dto';

describe('Create S3Parameter', () => {
  let createS3Parameter: CreateS3Parameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();

  const s3ParameterRepositoryMock = new Mock<S3ParameterRepository>();

  beforeEach(() => {
    createS3Parameter = new CreateS3Parameter(
      mapperMock.object(),
      s3ParameterRepositoryMock.object(),
    );
  });

  it('should create a s3Parameter', async () => {
    // Arrange
    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), S3ParameterRequestDto, S3Parameter),
      )
      .returns(S3ParameterMock);

    s3ParameterRepositoryMock
      .setup((s3ParameterRepository) =>
        s3ParameterRepository.create(It.IsAny()),
      )
      .returns(Promise.resolve(S3ParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), S3Parameter, S3ParameterResponseDto),
      )
      .returns(S3ParameterResponseMock);

    // Act
    const result = await createS3Parameter.handle(It.IsAny());

    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });
});
