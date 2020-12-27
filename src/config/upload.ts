import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

type IUploadConfig = {
    driver: 'azure' | 'disk';
    tmpFolder: string;
    uploadsFolder: string;
    config: {
        multer: {
            storage: StorageEngine;
        };
        azure: {
            container: string;
            url: string;
        };
    };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder: tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  config: {
    multer: {
      storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
    azure: {
      container: process.env.AZURE_STORAGE_CONTAINER_NAME || 'gobarberdefaultcontainer',
      url: process.env.AZURE_STORAGE_CONTAINER_URL || 'default_url',
    },
  },
} as IUploadConfig;
