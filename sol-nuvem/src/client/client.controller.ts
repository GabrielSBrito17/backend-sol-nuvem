import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ClientService, ICreatClient } from './client.service';
import { ICreatUserService } from 'src/users/users.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @Render('cliente')
  root() {}
  @Post()
  async creat(@Body() clientData: ICreatClient): Promise<ICreatUserService> {
    return this.clientService.createClient(clientData);
  }
}
