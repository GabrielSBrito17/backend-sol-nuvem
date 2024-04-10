import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { UserRepository } from 'src/users/users.repository';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, UserRepository, EmailService],
})
export class ClientModule {}
