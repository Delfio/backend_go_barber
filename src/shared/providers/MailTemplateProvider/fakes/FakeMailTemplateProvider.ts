import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateMailProvider implements IMailTemplateProvider {
  public async parse(data: IParserMailTemplateDTO): Promise<string> {
    return '';
  }
}

export default FakeMailTemplateMailProvider;
