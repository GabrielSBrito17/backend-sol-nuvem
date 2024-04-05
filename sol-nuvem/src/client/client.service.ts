import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createUser(createClientDto: CreateClientDto) {
    const { name, lastname, address, cep, phone, email, password, whatsapp } =
      createClientDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Primeiro, criamos o cliente
    const client = await this.prisma.client.create({
      data: {
        name,
        lastname,
        address,
        cep,
        phone,
        email,
        password: hashedPassword, // Certifique-se de que a senha esteja criptografada antes de salvá-la
        whatsapp,
      },
    });

    // Em seguida, criamos o usuário associado ao cliente
    const user = await this.prisma.users.create({
      data: {
        email: client.email,
        username: `${client.name} ${client.lastname}`, // Gera um username baseado no nome e sobrenome do cliente
        password: hashedPassword,
        type: 'client', // Define o tipo de usuário
        clientId: client.id, // Associa o usuário ao cliente
      },
    });

    return user;
  }
}
