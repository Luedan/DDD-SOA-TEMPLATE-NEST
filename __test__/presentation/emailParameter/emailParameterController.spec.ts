import { It, Mock } from 'moq.ts';
import { EmailParameterResponseMock } from '../../mocks/emailParameterMocks';
import { EmailParameterController } from '../../../src/presentation/controllers/parameters/email/emailParameter.controller';
import { CreateEmailParameter } from '../../../src/application/useCases/parameters/email/createEmailParameter.service';
import { FindAllEmailParameter } from '../../../src/application/useCases/parameters/email/findAllEmailParameter.service';
import { FindOneEmailParameter } from '../../../src/application/useCases/parameters/email/findOneEmailParameter.service';
import { UpdateEmailParameter } from '../../../src/application/useCases/parameters/email/updateEmailParameter.service';
import { DeleteEmailParameter } from '../../../src/application/useCases/parameters/email/deleteEmailParameter.service';

describe('EmailParameterController', () => {
  let emailParameterController: EmailParameterController;

  // Mocks
  const createEmailParameter = new Mock<CreateEmailParameter>();
  const findAllEmailParameter = new Mock<FindAllEmailParameter>();
  const findOneEmailParameter = new Mock<FindOneEmailParameter>();
  const updateEmailParameter = new Mock<UpdateEmailParameter>();
  const deleteEmailParameter = new Mock<DeleteEmailParameter>();

  beforeEach(async () => {
    emailParameterController = new EmailParameterController(
      createEmailParameter.object(),
      updateEmailParameter.object(),
      findAllEmailParameter.object(),
      findOneEmailParameter.object(),
      deleteEmailParameter.object(),
    );
  });

  it('Create EmailParameter', async () => {
    // Arrange
    createEmailParameter
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(EmailParameterResponseMock));

    // Act
    const result = await emailParameterController.create(It.IsAny());

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });

  it('Find All EmailParameter', async () => {
    // Arrange
    findAllEmailParameter
      .setup((i) => i.handle())
      .returns(Promise.resolve([EmailParameterResponseMock]));

    // Act
    const result = await emailParameterController.findAll();

    // Assert
    expect(result).toEqual([EmailParameterResponseMock]);
  });

  it('Find One EmailParameter', async () => {
    // Arrange
    findOneEmailParameter
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(EmailParameterResponseMock));

    // Act
    const result = await emailParameterController.findOne(It.IsAny());

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });

  it('Update EmailParameter', async () => {
    // Arrange
    updateEmailParameter
      .setup((i) => i.handle(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve(EmailParameterResponseMock));

    // Act
    const result = await emailParameterController.update(
      It.IsAny(),
      It.IsAny(),
    );

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });

  it('Delete EmailParameter', async () => {
    // Arrange
    deleteEmailParameter
      .setup((i) => i.handle(It.IsAny()))
      .returns(Promise.resolve(EmailParameterResponseMock));

    // Act
    const result = await emailParameterController.delete(It.IsAny());

    // Assert
    expect(result).toEqual(EmailParameterResponseMock);
  });
});
