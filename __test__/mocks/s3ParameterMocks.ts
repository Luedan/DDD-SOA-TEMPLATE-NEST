import { S3Parameter } from '../../src/domain/parameters/s3/s3Parameter.entity';
import { S3ParameterResponseDto } from '../../src/domain/parameters/s3/dto/s3Parameter-response.dto';
import { S3ParameterRequestDto } from '../../src/domain/parameters/s3/dto/s3Parameter-request.dto';
import { S3ParameterUpdateDto } from '../../src/domain/parameters/s3/dto/s3Parameter-update.dto';

export const S3ParameterMock: S3Parameter = {
  id: 1,
  accessKeyId: 'Test',
  secretAccessKey: 'Test',
  bucket: 'Test',
  region: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  endpoint: 'Test',
  url: 'Test',
};

export const S3ParameterMockArray: S3Parameter[] = [
  {
    id: 1,
    accessKeyId: 'Test',
    secretAccessKey: 'Test',
    bucket: 'Test',
    region: 'Test',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    endpoint: 'Test',
    url: 'Test',
  },
];

export const S3ParameterResponseMock: S3ParameterResponseDto = {
  id: 1,
  accessKeyId: 'Test',
  secretAccessKey: 'Test',
  bucket: 'Test',
  region: 'Test',
  endpoint: 'Test',
  url: 'Test',
};

export const S3ParameterResponseMockArray: S3ParameterResponseDto[] = [
  {
    id: 1,
    accessKeyId: 'Test',
    secretAccessKey: 'Test',
    bucket: 'Test',
    region: 'Test',
    endpoint: 'Test',
    url: 'Test',
  },
];

export const S3ParameterRequestMock: S3ParameterRequestDto = {
  id: 1,
  accessKeyId: 'Test',
  secretAccessKey: 'Test',
  bucket: 'Test',
  region: 'Test',
  endpoint: 'Test',
  url: 'Test',
};

export const S3ParameterUpdateMock: S3ParameterUpdateDto = {
  id: 1,
  accessKeyId: 'Test',
  secretAccessKey: 'Test',
  bucket: 'Test',
  region: 'Test',
  endpoint: 'Test',
  url: 'Test',
};
