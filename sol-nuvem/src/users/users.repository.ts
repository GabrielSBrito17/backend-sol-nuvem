import { PrismaClient } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: {
    email: string;
    username: string;
    password: string;
    type: string;
    clientId: number;
  }) {
    return this.prisma.users.create({
      data,
    });
  }

  async findUserById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async findUserByType(type: string) {
    return this.prisma.users.findFirst({
      where: { type: type },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async updateUser(
    id: number,
    data: Partial<{
      email: string;
      username: string;
      password: string;
      type: string;
    }>,
  ) {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
