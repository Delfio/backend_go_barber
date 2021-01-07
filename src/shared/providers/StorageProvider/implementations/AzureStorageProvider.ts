/* eslint-disable no-console */
import Azure from 'azure-storage';
import UploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import IStorageProvider from '../models/IStorageProvider';

class AzureStorageProvider implements IStorageProvider {
  private blobService: Azure.BlobService;

    private containerName: string;

    constructor() {
      try {
        this.containerName = UploadConfig.config.azure.container;
        this.blobService = Azure.createBlobService();

        this.blobService.createContainerIfNotExists(this.containerName, {
          publicAccessLevel: 'blob',
        }, (err) => {
          if (err) {
            console.log('erro: ', err)
          }
        })
      } catch (err) {
        console.log('erro lançado: ', err.message)
      }
    }

    async saveFile(file: string): Promise<string> {
      const originalPath = path.resolve(UploadConfig.tmpFolder, file);
      const promisseFile = new Promise((resolve, reject) => {
        this.blobService.createBlockBlobFromLocalFile(
          this.containerName,
          file,
          originalPath,
          (err, result) => {
            if (!err) {
              return resolve(result)
            }
            return reject(err)
          },
        )
      });

      await Promise.resolve(promisseFile);

      await fs.promises.unlink(originalPath);

      return file;
    }

    async deleteFile(file: string): Promise<void> {
      this.blobService.deleteBlob(
        this.containerName,
        file,
        (err, result) => {
          console.log('error %s', err);
          console.log('resultado %s', result);
        },
      )
    }
}

export default AzureStorageProvider;
