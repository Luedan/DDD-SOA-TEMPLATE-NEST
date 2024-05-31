import { EmailParameter } from '../../src/domain/parameters/email/emailParameter.entity';
import { EmailParameterResponseDto } from '../../src/domain/parameters/email/dto/emailParameter-response.dto';
import { EmailParameterRequestDto } from '../../src/domain/parameters/email/dto/emailParameter-request.dto';
import { EmailParameterUpdateDto } from '../../src/domain/parameters/email/dto/emailParameter-update.dto';

export const EmailParameterMock: EmailParameter = {
  id: 1,
  from: 'Test',
  host: 'Test',
  password: 'Test',
  port: 1,
  secure: true,
  username: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

export const EmailParameterMockArray: EmailParameter[] = [
  {
    id: 1,
    from: 'Test',
    host: 'Test',
    password: 'Test',
    port: 1,
    secure: true,
    username: 'Test',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

export const EmailParameterResponseMock: EmailParameterResponseDto = {
  id: 1,
  from: 'Test',
  host: 'Test',
  password: 'Test',
  port: 1,
  secure: true,
  username: 'Test',
};

export const EmailParameterResponseMockArray: EmailParameterResponseDto[] = [
  {
    id: 1,
    from: 'Test',
    host: 'Test',
    password: 'Test',
    port: 1,
    secure: true,
    username: 'Test',
  },
];

export const EmailParameterRequestMock: EmailParameterRequestDto = {
  id: 1,
  from: 'Test',
  host: 'Test',
  password: 'Test',
  port: 1,
  secure: true,
  username: 'Test',
};

export const EmailParameterUpdateMock: EmailParameterUpdateDto = {
  id: 1,
  from: 'Test',
  host: 'Test',
  password: 'Test',
  port: 1,
  secure: true,
  username: 'Test',
};
