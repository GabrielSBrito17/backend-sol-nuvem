import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

export interface ICreatClient {
  name: string;
  lastname: string;
  address?: string;
  cep?: string;
  phone?: number;
  email: string;
  username: string;
  password: string;
  whatsapp?: boolean;
  clientId?: any;
}

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(createClientDto: ICreatClient) {
    const { name, lastname, address, cep, phone, email, password, whatsapp } =
      createClientDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await this.prisma.client.create({
      data: {
        name,
        lastname,
        address,
        cep,
        phone,
        email,
        password: hashedPassword,
        whatsapp,
      },
    });

    const user = await this.prisma.users.create({
      data: {
        email: client.email,
        username: `${client.name} ${client.lastname}`,
        password: hashedPassword,
        type: 'client',
        clientId: client.id,
      },
    });

    return user;
  }
}
