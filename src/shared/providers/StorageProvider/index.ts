import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import AzureStorageProvider from './implementations/AzureStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';


const providersStorage = {
  disk: DiskStorageProvider,
  azure: AzureStorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providersStorage[uploadConfig.driver],
);
