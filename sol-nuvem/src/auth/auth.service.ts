import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJWT(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
