import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import Nodemailer from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';

interface IMessage {
    to: string;
    body: string;
}

@injectable()
export default class EtherialMailProvider implements IMailProvider {
    private cliente: Nodemailer.Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
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

    public async sendMail({
      to,
      subject,
      templateData,
      from,
    }: ISendMailDTO): Promise<void> {
      try {
        const message = await this.cliente.sendMail({
          from: {
            address: from?.email || 'equipe@gobarber.com.br',
            name: from?.name || 'equipe gobarber',
          },
          to: {
            name: to.name,
            address: to.email,
          },
          subject: 'Recuperação de senha',
          html: await this.mailTemplateProvider.parse(templateData),
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
