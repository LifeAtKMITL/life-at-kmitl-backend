// import {
//   Controller,
//   HttpException,
//   HttpStatus,
//   Post,
//   UploadedFile,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { existsSync, mkdirSync } from 'fs';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { FileService } from './services/file.service';
// import { FirebaseService } from './services/firebase.service';
// import { v4 as uuid } from 'uuid';

// @Controller('firebase')
// export class FirebaseController {
//   constructor(private firebaseService: FirebaseService, private fileService: FileService) {}

//   @Post('uploads')
//   @UseInterceptors(
//     FilesInterceptor('files', 5, {
//       // Enable file size limits
//       limits: {
//         fileSize: 15625000,
//       },
//       // Check the mimetypes to allow for upload
//       fileFilter: (req: any, file: any, cb: any) => {
//         if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
//           // Allow storage of file
//           cb(null, true);
//         } else {
//           // Reject file
//           cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
//         }
//       },
//       // Storage properties
//       storage: diskStorage({
//         // Destination storage path details
//         destination: (req: any, file: any, cb: any) => {
//           const uploadPath = 'uploads';
//           // Create folder if doesn't exist
//           if (!existsSync(uploadPath)) {
//             mkdirSync(uploadPath);
//           }
//           cb(null, uploadPath);
//         },
//         // File modification details
//         filename: (req: any, file: any, cb: any) => {
//           // Calling the callback passing the random name generated with the original extension name
//           cb(null, `${uuid()}${extname(file.originalname)}`);
//         },
//       }),
//     }),
//   )
//   async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
//     const response = [];
//     files.forEach(async (file) => {
//       //console.log(file);

//       const fileReponse = {
//         originalname: file.originalname,
//         encoding: file.encoding,
//         mimetype: file.mimetype,
//         id: file.id,
//         filename: file.filename,
//         metadata: file.metadata,
//         bucketName: file.bucketName,
//         chunkSize: file.chunkSize,
//         sizeByte: file.size,
//         md5: file.md5,
//         uploadDate: file.uploadDate,
//         contentType: file.contentType,
//       };
//       //console.log(fileReponse);
//       await this.fileService.create(file);
//       response.push(fileReponse);
//     });

//     return response;
//   }
// }
