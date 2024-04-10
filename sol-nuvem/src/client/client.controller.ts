import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import {
  ClientService,
  ICreatClient,
  IcreateClientResponse,
} from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @Render('cliente')
  root() {}
  @Post()
  async creat(
    @Body() clientData: ICreatClient,
  ): Promise<IcreateClientResponse> {
    return this.clientService.createClient(clientData);
  }
}
