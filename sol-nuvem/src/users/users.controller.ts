import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '@prisma/client';
import { CreateUsersDto } from '../dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: CreateUsersDto): Promise<Users> {
    return this.usersService.createUser(userData);
  }
}
