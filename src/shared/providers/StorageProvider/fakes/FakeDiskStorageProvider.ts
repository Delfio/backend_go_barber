import IStorageProvider from '../models/IStorageProvider';

interface IStorageFile {
    file: string;
}

export default class DiskStorageProvider implements IStorageProvider {
    private storage: IStorageFile[] = [];

    async deleteFile(file: string): Promise<void> {
      const findIndex = this.storage.findIndex((storageFile) => storageFile.file === file);

      if (findIndex >= 0) {
        this.storage.splice(findIndex, 1);
      }
    }

    async saveFile(file: string): Promise<string> {
      this.storage.push({
        file,
      });

      return file
    }
}
