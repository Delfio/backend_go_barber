import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateMailProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeMailTemplateMailProvider;
