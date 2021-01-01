import { container } from 'tsyringe';
import LogConfig from '@config/log';

import { ILogProvier } from './models/ILogProvider';
import DiskProvider from './implementations/DiskProvider';
import WinstonProvider from './implementations/WinstonProvider';


const { driver } = LogConfig;

const drivers = {
  disk: DiskProvider,
  winston: WinstonProvider,
}

container.registerSingleton<ILogProvier>(
  'LogProvider',
  drivers[driver],
)
