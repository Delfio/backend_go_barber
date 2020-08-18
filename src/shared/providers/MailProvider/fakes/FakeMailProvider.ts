import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

interface IMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IMailProvider {
    private messages: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
      this.messages.push({
        to,
        body,
      })
    }

    public async getEmailList(): Promise<IMessage[]> {
      return this.messages;
    }
}