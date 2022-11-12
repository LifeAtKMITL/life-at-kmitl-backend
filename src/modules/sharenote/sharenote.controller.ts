import { LikeSharenoteCommand } from './commands/like-sharenote/like-sharenote.command';
import { LikeSharenoteDto } from './dtos/likeSharenote/likeSharenote.dto';
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
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { AuthGuard } from '@nestjs/passport';
import { UserSchema } from '../user/db/user-schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ViewSharenoteCommand } from './commands/view-sharenote/view-sharenote.command';

const mulOp = {
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
  async getAllNotes(): Promise<Sharenote[]> {
    return this.queryBus.execute<SharenotesQuery, Sharenote[]>(new SharenotesQuery());
  }
  @Get(':id')
  async getSharenoteById(@Param('id') id: string): Promise<SharenotesDto> {
    return this.queryBus.execute<SharenoteByIdQuery, SharenoteDto>(new SharenoteByIdQuery(id));
  }

  @Post('uploads')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('files', 5, mulOp))
  async uploadFile(
    @CurrentUser() user: UserSchema,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() createSharenoteRequest: CreateSharenoteRequestDTO,
  ) {
    try {
      const { _id_mongo_user, userId, subjectId, sharenoteCollectionName, teachers, exam, year, description } =
        createSharenoteRequest;

      let listObjFile = await this.fileService.uploadsParams(files, user.userId, sharenoteCollectionName);
      //let ans = await this.fileService.upload(files[i]);

      let res: Sharenote;
      res = await this.commandBus.execute<CreateSharenoteCommand, Sharenote>(
        new CreateSharenoteCommand(user.userId, createSharenoteRequest, listObjFile),
      );

      return res;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Put('like')
  @UseGuards(AuthGuard())
  async likeSharenote(@CurrentUser() user: UserSchema, @Body() likeSharenoteDto: LikeSharenoteDto): Promise<any> {
    this.commandBus.execute<LikeSharenoteCommand, void>(new LikeSharenoteCommand(user.userId, likeSharenoteDto));
  }

  @Put('view')
  @UseGuards(AuthGuard())
  async viewSharenote(@CurrentUser() user: UserSchema, @Body() likeSharenoteDto: LikeSharenoteDto): Promise<any> {
    this.commandBus.execute<ViewSharenoteCommand, void>(new ViewSharenoteCommand(user.userId, likeSharenoteDto));
  }
}
