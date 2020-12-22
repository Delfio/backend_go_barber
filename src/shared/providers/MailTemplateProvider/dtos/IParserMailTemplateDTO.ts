interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IParserMailTemplateDTO {
    template: string;
    variables: ITemplateVariables;
}
