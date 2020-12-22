import HandleBars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse(data: IParserMailTemplateDTO): Promise<string> {
    const parserTemplate = HandleBars.compile(data.template);

    return parserTemplate(data.variables)
  }
}

export default HandlebarsMailTemplateProvider;
