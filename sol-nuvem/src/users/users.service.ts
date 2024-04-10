import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserSchema } from './user.schemas';
import { Errors } from 'src/utils/Errors';
import { Success } from 'src/utils/Success';

export interface ICreatUserService {
  email: string;
  username: string;
  password: string;
  type: string;
  clientId?: number;
}

export interface ICreatUserResponse {
  status: number;
  message: string;
}

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    createUsersDto: ICreatUserService,
  ): Promise<ICreatUserResponse> {
    try {
      await UserSchema.validate(createUsersDto);
    } catch (error) {
      return Errors.generic.validationError(error);
    }

    const { email, username, password, type, clientId } = createUsersDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      email,
      username,
      password: hashedPassword,
      type,
      clientId,
    };
    await this.userRepository.createUser(data);
    return Success.generic.userCreateSuccess();
  }
}
