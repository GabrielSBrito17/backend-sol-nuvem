import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ClientRepository } from './client.repository';
import { UserRepository } from 'src/users/users.repository';
import { ClientSchema } from './client.schema';
import { Errors } from 'src/utils/Errors';
import { Success } from 'src/utils/Success';
import { EmailService } from 'src/email/email.service';

export interface ICreatClient {
  name: string;
  lastname: string;
  address?: string;
  cep?: string;
  phone?: number;
  email: string;
  password: string;
  whatsapp?: boolean;
  clientId?: any;
}

export interface IcreateClientResponse {
  status: number;
  message: string;
}

@Injectable()
export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
    private userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async createClient(
    createClient: ICreatClient,
  ): Promise<IcreateClientResponse> {
    try {
      await ClientSchema.validate(createClient);
    } catch (error) {
      const info = error.message;
      return Errors.generic.validationError({ message: info });
    }

    const { name, lastname, address, cep, phone, email, password, whatsapp } =
      createClient;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      lastname,
      address,
      cep,
      phone,
      email,
      password: hashedPassword,
      whatsapp,
    };
    const existingUser = await this.userRepository.findUserByEmail(email);
    const existingClient = await this.clientRepository.findClientByEmail(email);
    if (existingUser) {
      return Errors.generic.emailError();
    }
    if (existingClient) {
      return Errors.generic.emailError();
    }

    const client = await this.clientRepository.createClient(data);
    const admin = await this.userRepository.findUserByType('admin');
    if (!admin) {
      return Errors.generic.adminNotFoundError();
    }
    try {
      const dataUser = {
        email: client.email,
        username: `${client.name} ${client.lastname}`,
        password: hashedPassword,
        type: 'client',
        clientId: client.id,
      };
      await this.userRepository.createUser(dataUser);
      await this.emailService.sendWelcomeEmail(
        createClient.email,
        createClient.name,
      );
      await this.emailService.sendAdminNotification(
        admin.email,
        createClient.name,
      );
      return Success.generic.userCreateSuccess();
    } catch (error) {
      const info = error.message;
      return Errors.generic.validationError({ message: info });
    }
  }
}
