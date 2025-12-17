import nodemailer from 'nodemailer';
import IEmailService from '../../application/interfaces/services/IEmailService';

export default class EmailService implements IEmailService {
  async sendEmail(to: string, subject: string, content: string): Promise<string | null> {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    try {
      const emailInfo = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: to,
        subject: subject,
        html: content,
      });

      console.log('Email send :from the nodemailer ~ sendmail.ts');
      return emailInfo.messageId;
    } catch (error: unknown) {
      console.error('Error occured while sending email to the user', error);
      return null;
    }
  }
}
