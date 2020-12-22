import IParserMailTemplate from '../dtos/IParserMailTemplateDTO';

export default interface IMailTemplateProvider {
    parse(data: IParserMailTemplate): Promise<string>;
}
