import HandleBars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParserMailTemplateDTO from '../dtos/IParserMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse(data: IParserMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(data.file, {
      encoding: 'utf-8',
    })

    const parserTemplate = HandleBars.compile(templateFileContent);

    return parserTemplate(data.variables)
  }
}

export default HandlebarsMailTemplateProvider;
