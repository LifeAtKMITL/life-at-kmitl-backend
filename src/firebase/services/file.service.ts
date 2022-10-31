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

  async uploadsParams(files, _id_mongo_user, sharenoteCollentionName): Promise<any> {
    let listRef = ref(await this.firebaseService.getStorage(), `Images/${_id_mongo_user}`);
    const fixName_sharenoteCollentionName = sharenoteCollentionName;
    await listAll(listRef)
      .then((res) => {
        // console.log('object', res.prefixes.length);
        // console.log('object', res.prefixes);
        let version = 0;
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          //console.log(res.prefixes);

          if (folderRef.name.includes(fixName_sharenoteCollentionName)) {
            sharenoteCollentionName = `${fixName_sharenoteCollentionName}_@V${version + 1}`;
            version += 1;
          }
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          //console.log(itemRef);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

    let storageRef = ref(
      await this.firebaseService.getStorage(),
      `Images/${_id_mongo_user}/${sharenoteCollentionName}`,
    );

    let listFile = [];
    for (let i = 0; i < files.length; i++) {
      files[i] = {
        ...files[i],
        buffer: new Uint8Array(files[i].buffer),
        uploadDate: Date(),
        filename: uuidv4(),
      };
      const metadata = {
        contentType: `${files[i].mimetype}`,
      };

      let thisref = ref(storageRef, `${files[i].filename}`);
      const uploadTask = await uploadBytesResumable(thisref, files[i].buffer, metadata);

      let url = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
        //console.log('File available at', downloadURL);
        return downloadURL;
      });

      let fileResponse = {
        userIdMongo: `${_id_mongo_user}`,
        collectionName: `${sharenoteCollentionName}`,
        filename: files[i].filename,
        originalname: files[i].originalname,
        encoding: files[i].encoding,
        mimetype: files[i].mimetype,
        sizeByte: files[i].size,
        uploadDate: files[i].uploadDate,
        url: url,
      };
      listFile.push(fileResponse);
    }

    //console.log(listFile);
    return listFile;
  }

  async upload(file): Promise<any> {
    let storageRef = ref(await this.firebaseService.getStorage(), 'Images/_id_mongo_user/sharenoteCollectionName');

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

    let url = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
      //console.log('File available at', downloadURL);
      return downloadURL;
    });

    let fileResponse = {
      filename: file.filename,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      sizeByte: file.size,
      uploadDate: file.uploadDate,
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
