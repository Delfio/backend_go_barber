import fs from 'fs';
import path from 'path';
import UploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(UploadConfig.uploadsFolder, file);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(UploadConfig.tmpFolder, file),
      path.resolve(UploadConfig.uploadsFolder, 'uploads', file),
    );

    return file;
  }
}
