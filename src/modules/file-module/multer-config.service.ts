import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';
import * as crypto from 'crypto';
import * as path from 'path';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@life-at-kmitl-cluster.svvzfuy.mongodb.net/life-at-kmitl-db`,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: 'uploads',
            };
            resolve(fileInfo);
          });
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
