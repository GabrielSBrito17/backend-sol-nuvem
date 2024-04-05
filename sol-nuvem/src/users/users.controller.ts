import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import { ICreatUserService, UsersService } from './users.service';
import { Users } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('login')
  root() {}
  @Post()
  async create(@Body() userData: ICreatUserService): Promise<Users> {
    return this.usersService.createUser(userData);
  }
}
