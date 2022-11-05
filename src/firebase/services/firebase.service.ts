import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { IConfig } from '../config/config-firebaseService.model';
import { FirebaseStorage, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';

import { CollectionReference, Firestore, getFirestore, collection } from 'firebase/firestore';

@Injectable()
export class FirebaseService {
  private app: FirebaseApp;
  private firebaseStorage: FirebaseStorage;

  constructor(private configService: ConfigService<IConfig>) {
    this.app = initializeApp({
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      appId: process.env.APPID,
      measurementId: process.env.MEASUREMENTID,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
    });

    this.firebaseStorage = getStorage(this.app);
  }

  public async getStorage(): Promise<FirebaseStorage> {
    return this.firebaseStorage;
  }
}
