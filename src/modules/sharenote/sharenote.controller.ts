import { Sharenote } from './Sharenote';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { CommandBus ,QueryBus} from '@nestjs/cqrs';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateSharenoteCommand } from './commands/create-sharenote/create-sharenote.command';
import { CreateSharenoteRequestDTO } from './dtos/request/create-sharenote-request.dto';
import { extname } from 'path';
import { FileService } from 'src/firebase/services/file.service';
import { FirebaseService } from 'src/firebase/services/firebase.service';
import { SharenotesQuery } from './queries/sharenotes.query';
import { SharenoteDto } from './dtos/sharenote.dto';
import { SharenotesDto } from './dtos/sharenotes.dto';
import { SharenoteByIdQuery } from './queries/sharenoteById.handler';

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
    private readonly queryBus: QueryBus,
  ) {}
  
  @Get()
  async getAllNotes():Promise<SharenoteDto[]> {
    return  this.queryBus.execute<SharenotesQuery, SharenoteDto[]>(new SharenotesQuery());
  }
  @Get(':id')
  async getSharenoteById(@Param('id') id: string): Promise<SharenotesDto> {
    return this.queryBus.execute<SharenoteByIdQuery, SharenoteDto>(new SharenoteByIdQuery(id));
  }
  // @Post()
  // async createSharenote(@Body() createSharenoteRequest: CreateSharenoteRequestDTO): Promise<void> {
  //   await this.commandBus.execute<CreateSharenoteCommand, void>(new CreateSharenoteCommand(createSharenoteRequest));
  // }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 5, mulOp))
  async uploadFile(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() createSharenoteRequest: CreateSharenoteRequestDTO,
  ) {
    try {
      const { _id_mongo_user, sharenoteCollectionName, teachers } = createSharenoteRequest;

      let listObjFile = await this.fileService.uploadsParams(files, _id_mongo_user, sharenoteCollectionName);
      //let ans = await this.fileService.upload(files[i]);

      let res: Sharenote;
      res = await this.commandBus.execute<CreateSharenoteCommand, Sharenote>(
        new CreateSharenoteCommand(createSharenoteRequest, listObjFile),
      );

      return res;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }


}
