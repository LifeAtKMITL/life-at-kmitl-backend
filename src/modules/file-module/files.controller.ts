import {
  Post,
  Get,
  Param,
  Res,
  Controller,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { FilesInterceptor, MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileResponseVm } from './file-response-vm.model';
import { GridFsMulterConfigService } from './multer-config.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { existsSync, mkdirSync } from 'fs';

import { v4 as uuid } from 'uuid';

const multer = new GridFsMulterConfigService();
let mOption = multer.createMulterOptions();
console.log(mOption);

@Controller('/attachment/files')
export class FilesController {
  constructor(private filesService: FilesService, private gridFsMulter: GridFsMulterConfigService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      // Enable file size limits
      limits: {
        fileSize: 15625000,
      },
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
      // Storage properties
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = 'uploads';
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
          // Calling the callback passing the random name generated with the original extension name
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    const response = [];
    files.forEach((file) => {
      console.log(file);

      const fileReponse = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        id: file.id,
        filename: file.filename,
        metadata: file.metadata,
        bucketName: file.bucketName,
        chunkSize: file.chunkSize,
        sizeByte: file.size,
        md5: file.md5,
        uploadDate: file.uploadDate,
        contentType: file.contentType,
      };
      console.log(fileReponse);
      response.push(fileReponse);
    });

    return response;
  }

  @Get('info/:id')
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED);
    }
    return {
      message: 'File has been detected',
      file: file,
    };
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Get('delete/:id')
  async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.deleteFile(id);
    if (!filestream) {
      throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED);
    }
    return {
      message: 'File has been deleted',
      file: file,
    };
  }
}
