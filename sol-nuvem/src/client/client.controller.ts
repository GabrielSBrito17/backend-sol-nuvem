import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from 'src/dto/create-client.dto';
import { CreateUsersDto } from 'src/dto/create-users.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async creat(@Body() clientData: CreateClientDto): Promise<CreateUsersDto> {
    return this.clientService.createClient(clientData);
  }
}
