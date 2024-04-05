import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsersDto } from '../dto/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUsersDto: CreateUsersDto) {
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
