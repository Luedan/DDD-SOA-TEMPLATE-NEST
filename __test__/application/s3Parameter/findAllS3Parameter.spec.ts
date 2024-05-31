import { Mock } from 'moq.ts';
import { Mapper } from '@automapper/core';
import { FindAllS3Parameter } from '../../../src/application/useCases/parameters/s3/findAllS3Parameter.service';
import { S3ParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/s3/s3Parameter.repository';
import { S3Parameter } from '../../../src/domain/parameters/s3/s3Parameter.entity';
import { S3ParameterResponseDto } from '../../../src/domain/parameters/s3/dto/s3Parameter-response.dto';

import {
  S3ParameterMockArray,
  S3ParameterResponseMockArray,
} from '../../mocks/s3ParameterMocks';

describe('Find All S3Parameter', () => {
  let findAllS3Parameter: FindAllS3Parameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const s3ParameterRepositoryMock = new Mock<S3ParameterRepository>();

  beforeEach(() => {
    findAllS3Parameter = new FindAllS3Parameter(
      mapperMock.object(),
      s3ParameterRepositoryMock.object(),
    );
  });

  it('should return all s3Parameters', async () => {
    // Arrange
    s3ParameterRepositoryMock
      .setup((s3ParameterRepository) => s3ParameterRepository.getAll())
      .returns(Promise.resolve(S3ParameterMockArray));

    mapperMock
      .setup((mapper) =>
        mapper.mapArray(
          S3ParameterMockArray,
          S3Parameter,
          S3ParameterResponseDto,
        ),
      )
      .returns(S3ParameterResponseMockArray);

    // Act
    const result = await findAllS3Parameter.handle();

    // Assert
    expect(result).toEqual(S3ParameterResponseMockArray);
  });
});
