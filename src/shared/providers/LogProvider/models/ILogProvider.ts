
type IType = 'info' | 'warn' | 'error';

export interface ILogProvier {
    sendEventInfo(data: string, type: IType): Promise<void>;
}

export { IType };
