export class CreateClientDto {
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
