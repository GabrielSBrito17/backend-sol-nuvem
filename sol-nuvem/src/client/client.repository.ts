import { PrismaClient } from '@prisma/client';

export class ClientRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createClient(data: {
    name: string;
    lastname: string;
    address: string;
    cep: string;
    phone: number;
    email: string;
    password: string;
    whatsapp: boolean;
  }) {
    return this.prisma.client.create({
      data,
    });
  }

  async findClientById(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  async findClientByEmail(email: string) {
    return this.prisma.client.findUnique({
      where: { email },
    });
  }

  async updateClient(
    id: number,
    data: Partial<{
      name: string;
      lastname: string;
      address: string;
      cep: string;
      phone: number;
      email: string;
      password: string;
      whatsapp: boolean;
    }>,
  ) {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
