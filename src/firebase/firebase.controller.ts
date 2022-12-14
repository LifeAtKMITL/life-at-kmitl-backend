import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from './services/file.service';
import { FirebaseService } from './services/firebase.service';
import { v4 as uuid } from 'uuid';

@Controller('firebase')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService, private fileService: FileService) {}

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 15625000,
      },
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
    }),
  )
  async uploads(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      let res = [];

      for (let i = 0; i < files.length; i++) {
        let ans = await this.fileService.upload(files[i]);
        //console.log('++++', ans);
        res.push(ans);
      }

      //console.log(res);
      return res;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Get()
  async getAllFileDownloadURL(): Promise<any> {
    let res;
    res = await this.fileService.getALLDownloadURL();
    return res;
  }
}
