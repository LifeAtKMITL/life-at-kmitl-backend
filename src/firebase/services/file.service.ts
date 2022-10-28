import { FirebaseService } from './firebase.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { IConfig } from '../config/config-firebaseService.model';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';

import { CollectionReference, Firestore, getFirestore, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(private firebaseService: FirebaseService) {}

  async upload(files): Promise<void> {
    let storageRef = ref(await this.firebaseService.getStorage(), 'Images/userId');
    let res = [];

    files.forEach(async (file) => {
      file = {
        ...file,
        buffer: new Uint8Array(file.buffer),
        uploadDate: Date(),
      };
      console.log(file);

      // console.log(file.buffer);
      // const bytes = new Uint8Array(file.buffer);
      // console.log(bytes);
      const metadata = {
        contentType: `${file.mimetype}`,
      };

      let thisref = ref(storageRef, `${uuidv4()}`);

      const uploadTask = uploadBytesResumable(thisref, file.buffer, metadata);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        },
      );
    });
  }
  async getDownloadURL(files): Promise<void> {}
}
