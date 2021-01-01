import winston from 'winston';
import path from 'path';
import { MongoDB, MongoDBTransportInstance } from 'winston-mongodb';
import LogConfig from '@config/log';
import { FileTransportInstance } from 'winston/lib/winston/transports';
import { ILogProvier, IType } from '../models/ILogProvider';

type IAllDefaultType = FileTransportInstance & MongoDBTransportInstance;

export default class WinstonLogs implements ILogProvier {
    private logger: winston.Logger;

    constructor() {
      const {
        disk: DiskConfig,
        mongoDB: MongoConfig,
        useDriver,
      } = LogConfig.config.winstonlogs

      const drivers = () => {
        const disk = (): FileTransportInstance[] => {
          const loggPath = path.resolve(DiskConfig.pathSaveLogs);
          const diskTransporters = [
            new winston.transports.File({
              filename: 'error.log',
              dirname: loggPath,
              format: winston.format.json(),
              level: 'error',
            }),
            new winston.transports.File({
              filename: 'info.log',
              dirname: loggPath,
              format: winston.format.json(),
              level: 'info',
            }),
            new winston.transports.File({
              filename: 'warn.log',
              dirname: loggPath,
              format: winston.format.json(),
              level: 'warn',
            }),
          ];

          return diskTransporters;
        };
        const mongoDB = (): MongoDBTransportInstance[] => {
          const {
            error,
            info,
            warn,
          } = MongoConfig;
          const mongoTransporters = [
            new MongoDB({
              db: error.db,
              name: error.name,
              tryReconnect: true,
              label: error.label,
              level: error.level,
              options: error.options,
            }),
            new MongoDB({
              db: info.db,
              name: info.name,
              tryReconnect: true,
              label: info.label,
              level: info.level,
              options: info.options,
            }),
            new MongoDB({
              db: warn.db,
              name: warn.name,
              tryReconnect: true,
              label: warn.label,
              level: warn.level,
              options: warn.options,
            }),
          ];

          return mongoTransporters
        };
        const all = (): IAllDefaultType => {
          const diskTransporters = disk();
          const mongoTransporters = mongoDB();

          return Object.assign(diskTransporters, mongoTransporters) as unknown as IAllDefaultType;
        };
        return {
          disk,
          mongoDB,
          all,
        }
      };

      this.logger = winston.createLogger({
        format: winston.format.json(),
        defaultMeta: { service: 'go-barber' },
        transports: drivers()[useDriver || 'disk'](),
      })
    }

    public async sendEventInfo(data: string, type: IType): Promise<void> {
      this.logger[type](data);
    }
}
