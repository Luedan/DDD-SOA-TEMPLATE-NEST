import { It, Mock } from 'moq.ts';
import { S3ParameterResponseMock } from '../../mocks/s3ParameterMocks';
import { S3ParameterController } from '../../../src/presentation/controllers/parameters/s3/s3Parameter.controller';
import { CreateS3Parameter } from '../../../src/application/useCases/parameters/s3/createS3Parameter.service';
import { FindAllS3Parameter } from '../../../src/application/useCases/parameters/s3/findAllS3Parameter.service';
import { FindOneS3Parameter } from '../../../src/application/useCases/parameters/s3/findOneS3Parameter.service';
import { UpdateS3Parameter } from '../../../src/application/useCases/parameters/s3/updateS3Parameter.service';
import { DeleteS3Parameter } from '../../../src/application/useCases/parameters/s3/deleteS3Parameter.service';

describe('S3ParameterController', () => {
  let s3ParameterController: S3ParameterController;

  // Mocks
  const createS3Parameter = new Mock<CreateS3Parameter>();
  const findAllS3Parameter = new Mock<FindAllS3Parameter>();
  const findOneS3Parameter = new Mock<FindOneS3Parameter>();
  const updateS3Parameter = new Mock<UpdateS3Parameter>();
  const deleteS3Parameter = new Mock<DeleteS3Parameter>();

  beforeEach(async () => {
    s3ParameterController = new S3ParameterController(
      createS3Parameter.object(),
      updateS3Parameter.object(),
      findAllS3Parameter.object(),
      findOneS3Parameter.object(),
      deleteS3Parameter.object(),
    );
  });

  it('Create S3Parameter', async () => {
    // Arrange
    createS3Parameter
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(S3ParameterResponseMock));

    // Act
    const result = await s3ParameterController.create(It.IsAny());

    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });

  it('Find All S3Parameter', async () => {
    // Arrange
    findAllS3Parameter
      .setup((i) => i.handle())
      .returns(Promise.resolve([S3ParameterResponseMock]));

    // Act
    const result = await s3ParameterController.findAll();

    // Assert
    expect(result).toEqual([S3ParameterResponseMock]);
  });

  it('Find One S3Parameter', async () => {
    // Arrange
    findOneS3Parameter
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(S3ParameterResponseMock));

    // Act
    const result = await s3ParameterController.findOne(It.IsAny());

    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });

  it('Update S3Parameter', async () => {
    // Arrange
    updateS3Parameter
      .setup((i) => i.handle(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(S3ParameterResponseMock));

    // Act
    const result = await s3ParameterController.update(It.IsAny(), It.IsAny());

    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });

  it('Delete S3Parameter', async () => {
    // Arrange
    deleteS3Parameter
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(S3ParameterResponseMock));

    // Act
    const result = await s3ParameterController.delete(It.IsAny());

    // Assert
    expect(result).toEqual(S3ParameterResponseMock);
  });
});
