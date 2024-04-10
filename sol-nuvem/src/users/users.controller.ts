import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import {
  ICreatUserResponse,
  ICreatUserService,
  UsersService,
} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('login')
  root() {}
  @Post()
  async create(
    @Body() userData: ICreatUserService,
  ): Promise<ICreatUserResponse> {
    return this.usersService.createUser(userData);
  }
}
