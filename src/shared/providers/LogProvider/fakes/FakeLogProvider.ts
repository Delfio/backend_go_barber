import { ILogProvier, IType } from '../models/ILogProvider';

type ICacheTipe = {
    [key in IType]: string[];
};

class FakeLogProvider implements ILogProvier {
    private logMessages: ICacheTipe = {} as ICacheTipe;

    async sendEventInfo(data: string, type: IType): Promise<void> {
      this.logMessages[type].push(data);
    }
}

export default FakeLogProvider;
