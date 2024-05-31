import { UserResponseDto } from '../../src/domain/user/dto/user-response.dto';
import { UserRequestDto } from '../../src/domain/user/dto/user-request.dto';
import { UserUpdateDto } from '../../src/domain/user/dto/user-update.dto';
import { User } from '../../src/domain/user/user.entity';

export const UserMock: User = {
  id: 1,
  email: 'test@test.com',
  password: '$2b$10$qatUHXvBqAzrPhg21SXxOOWc6KBO.aPVZXNikqUXRIstfqUSbJh7i',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const UserMockArray: User[] = [
  {
    id: 1,
    email: 'test@test.com',
    password: '$2b$10$qatUHXvBqAzrPhg21SXxOOWc6KBO.aPVZXNikqUXRIstfqUSbJh7i',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export const UserResponseMock: UserResponseDto = {
  id: 1,
  email: 'test@test.com',
};

export const UserResponseMockArray: UserResponseDto[] = [
  {
    id: 1,
    email: 'test@test.com',
  },
];

export const UserRequestMock: UserRequestDto = {
  id: 1,
  email: 'test@test.com',
  password: 'password',
};

export const UserUpdateMock: UserUpdateDto = {
  id: 1,
  email: 'test@test.com',
  password: 'password',
};
