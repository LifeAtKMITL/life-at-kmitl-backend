import { FirebaseService } from './firebase.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { IConfig } from '../config/config-firebaseService.model';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  listAll,
} from 'firebase/storage';

import { CollectionReference, Firestore, getFirestore, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(private firebaseService: FirebaseService) {}

  async upload(file): Promise<any> {
    let storageRef = ref(await this.firebaseService.getStorage(), 'Images/userId/collectionName');
    let res = [];
    //console.log(file);

    file = {
      ...file,
      buffer: new Uint8Array(file.buffer),
      uploadDate: Date(),
      filename: uuidv4(),
    };
    const metadata = {
      contentType: `${file.mimetype}`,
    };

    let thisref = ref(storageRef, `${file.filename}`);
    const uploadTask = await uploadBytesResumable(thisref, file.buffer, metadata);

    let url;
    url = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
      //console.log('File available at', downloadURL);
      return downloadURL;
    });

    let fileResponse = {
      userId: '1234 DONT FORGET',
      collectionName: 'collectionName DONT FORGET',
      filename: file.filename,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      id: file.id,
      metadata: file.metadata,
      bucketName: file.bucketName,
      chunkSize: file.chunkSize,
      sizeByte: file.size,
      md5: file.md5,
      uploadDate: file.uploadDate,
      contentType: file.contentType,
      url: url,
    };

    return fileResponse;
  }
  async getALLDownloadURL(): Promise<any> {
    let ref1 = ref(await this.firebaseService.getStorage(), 'Images/userId');
    console.log(ref1);
    let response = [];
    listAll(ref1)
      .then(async (res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          //console.log('folderRef =', folderRef);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          //console.log('itemRef =', itemRef);
          let url = getDownloadURL(itemRef).then(async (downloadURL) => {
            return downloadURL;
          });
          response.push(url);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    console.log(response);
    return response;
  }
}
