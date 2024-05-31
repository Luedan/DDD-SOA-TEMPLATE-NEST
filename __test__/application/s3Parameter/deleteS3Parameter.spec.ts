import { It, Mock } from 'moq.ts';
import { Mapper } from '@automapper/core';
import { DeleteS3Parameter } from '../../../src/application/useCases/parameters/s3/deleteS3Parameter.service';
import { S3ParameterRepository } from '../../../src/infrastructure/persistence/repositories/parameters/s3/s3Parameter.repository';
import { S3Parameter } from '../../../src/domain/parameters/s3/s3Parameter.entity';
import { S3ParameterResponseDto } from '../../../src/domain/parameters/s3/dto/s3Parameter-response.dto';
import {
  S3ParameterMock,
  S3ParameterResponseMock,
} from '../../mocks/s3ParameterMocks';

describe('Delete S3Parameter', () => {
  let deleteS3Parameter: DeleteS3Parameter;

  // Mocks
  const mapperMock = new Mock<Mapper>();
  const s3ParameterRepositoryMock = new Mock<S3ParameterRepository>();

  beforeEach(() => {
    deleteS3Parameter = new DeleteS3Parameter(
      mapperMock.object(),
      s3ParameterRepositoryMock.object(),
    );
  });

  it('should delete a s3Parameter', async () => {
    // Arrange
    s3ParameterRepositoryMock
      .setup((s3ParameterRepository) =>
        s3ParameterRepository.delete(It.IsAny()),
      )
      .returns(Promise.resolve(S3ParameterMock));

    mapperMock
      .setup((mapper) =>
        mapper.map(It.IsAny(), S3Parameter, S3ParameterResponseDto),
      )
      .returns(S3ParameterResponseMock);

    // Act
    const result = await deleteS3Parameter.handle(It.IsAny());

    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });
});
