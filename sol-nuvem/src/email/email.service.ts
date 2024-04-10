import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: to,
      subject: 'Bem-vindo ao nosso sistema!',
      text: `Olá ${name}, bem-vindo ao nosso sistema!`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendAdminNotification(to: string, name: string) {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: to,
      subject: 'Novo usuário cadastrado',
      text: `Um novo usuário, ${name}, acabou de se cadastrar no sistema.`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
