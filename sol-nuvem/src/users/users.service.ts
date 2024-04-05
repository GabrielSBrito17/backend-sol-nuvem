import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

export interface ICreatUserService {
  email: string;
  username: string;
  password: string;
  type: string;
  clientId?: number;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUsersDto: ICreatUserService) {
    const { email, username, password, type, clientId } = createUsersDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
        type,
        clientId,
      },
    });
  }
}
