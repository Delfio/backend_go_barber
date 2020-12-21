import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import Nodemailer from 'nodemailer';

interface IMessage {
    to: string;
    body: string;
}

export default class EtherialMailProvider implements IMailProvider {
    private cliente: Nodemailer.Transporter;

    constructor() {
      const transporter = (acc: Nodemailer.TestAccount): void => {
        const mail = Nodemailer.createTransport({
          host: acc.smtp.host,
          port: acc.smtp.port,
          secure: acc.smtp.secure,
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            user: acc.user,
            pass: acc.pass,
          },
        });

        this.cliente = mail;
      }

      Nodemailer.createTestAccount()
        .then(transporter)
        .catch((err) => {
          console.error('deu erro na criação %s', err)
        });
    }

    public async sendMail(to: string, body: string): Promise<void> {
      try {
        const message = await this.cliente.sendMail({
          from: 'Equipe teste',
          to,
          subject: 'Recuperação de senha',
          text: body,
        });

        console.log('message id: %s', message.messageId);
        console.log('message url: %s', Nodemailer.getTestMessageUrl(message));
      } catch (err) {
        console.log('deu erro kkk %s', err)
      }
    }

    public async getEmailList(): Promise<IMessage[]> {
      return [];
    }
}
