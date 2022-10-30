import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateSharenoteCommand } from './commands/create-sharenote/create-sharenote.command';
import { CreateSharenoteRequest } from './dtos/request/create-sharenote-request.dto';
import { extname } from 'path';
import { FileService } from 'src/firebase/services/file.service';
import { FirebaseService } from 'src/firebase/services/firebase.service';

let mulOp = {
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
};

@Controller('sharenote')
export class SharenoteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly filebaseService: FirebaseService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  async createSharenote(@Body() createSharenoteRequest: CreateSharenoteRequest): Promise<void> {
    await this.commandBus.execute<CreateSharenoteCommand, void>(new CreateSharenoteCommand(createSharenoteRequest));
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 5, mulOp))
  async uploadFile(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    try {
      // console.log(files.files);

      console.log(body);
      // console.log(files.sharenoteCollectionName);

      let res = [];
      for (let i = 0; i < files.length; i++) {
        //console.log(files[i]);
        let ans = await this.fileService.uploadParams(files[i], body._id_mongo_user, body.sharenoteCollectionName);
        //let ans = await this.fileService.upload(files[i]);

        //console.log('++++', ans);
        res.push(ans);
      }

      //console.log(res);
      return res;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }
}
