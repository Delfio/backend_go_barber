import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';


export default class FakeMailProvider implements IMailProvider {
    private messages: ISendMailDTO[] = [];

    public async sendMail(data: ISendMailDTO): Promise<void> {
      this.messages.push(data);
    }

    public async getEmailList(): Promise<ISendMailDTO[]> {
      return this.messages;
    }
}
