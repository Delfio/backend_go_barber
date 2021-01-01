import path from 'path';
import fs from 'fs';
import { ILogProvier, IType } from '../models/ILogProvider';

export default class DiskLogs implements ILogProvier {
    private loggPath: string;

    constructor() {
      this.loggPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'temp', 'logs')

      const createFile = (): Promise<void> => new Promise(
        (resolve, reject) => fs.mkdir(this.loggPath, (err) => {
          if (err) reject(err)
          else resolve();
        }),
      );

      new Promise((resolv, reject) => fs.access(this.loggPath, (error) => {
        if (error) {
          return reject(error)
        }
        return resolv('sucesso');
      }))
        .then()
        .catch((err) => {
          console.log('arquivo não exists, %s', err)
          createFile().then().catch((error) => console.log('Error: %s', error))
        })
    }

    public async sendEventInfo(data: string, type: IType): Promise<void> {
      const AppendLogFile = async (): Promise<void> => {
        const logErrorArchivment = path.join(this.loggPath, `${type}.log`);
        await fs.promises.appendFile(logErrorArchivment, `${data}\n`, {
          encoding: 'utf-8',
        });
      };

      await AppendLogFile();
    }
}
