import { MongoDBConnectionOptions } from 'winston-mongodb';

type ILogConfig = {
    driver: 'disk' | 'winston';
    config: {
        winstonlogs: {
            disk: {
                pathSaveLogs: string;
            };
            mongoDB: {
                info: MongoDBConnectionOptions;
                warn: MongoDBConnectionOptions;
                error: MongoDBConnectionOptions;
            };
            useDriver: 'disk' | 'mongoDB' | 'all';
        };
    };
}

export default {
  driver: process.env.LOG_DRIVER || 'disk',
  config: {
    winstonlogs: {
      disk: {
        pathSaveLogs: process.env.WINSTON_LOG_PATH,
      },
      mongoDB: {
        error: {
          db: process.env.WINSTON_URI_MONGO,
          level: 'error',
          label: process.env.WINSTON_LABEL_ERROR || undefined,
          name: process.env.WINSTON_SCHEMA_ERROR,
          tryReconnect: true,
          options: {
            useUnifiedTopology: true,
          },
        },
        info: {
          db: process.env.WINSTON_URI_MONGO,
          level: 'info',
          label: process.env.WINSTON_LABEL_INFO || undefined,
          name: process.env.WINSTON_SCHEMA_INFO,
          tryReconnect: true,
          options: {
            useUnifiedTopology: true,
          },
        },
        warn: {
          db: process.env.WINSTON_URI_MONGO,
          level: 'warn',
          label: process.env.WINSTON_LABEL_WARN || undefined,
          name: process.env.WINSTON_SCHEMA_WARN,
          tryReconnect: true,
          options: {
            useUnifiedTopology: true,
          },
        },
      },
      useDriver: process.env.WINSTON_USE_DRIVER || 'disk',
    },
  },
} as ILogConfig;
