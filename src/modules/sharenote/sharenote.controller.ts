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
  UploadedFiles,
  UseInterceptors,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
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
import { SharenoteProfileQuery } from './queries/sharenote-profile-query';
import { ProfileSharenoteDto } from './dtos/profileSharenote/profile-sharenote.dto';
import { GetAllSharenoteDto } from './dtos/getAll Sharenote/getall-sharenote.dto';

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
  async getAllNotes(): Promise<GetAllSharenoteDto[]> {
    return this.queryBus.execute<SharenotesQuery, GetAllSharenoteDto[]>(new SharenotesQuery());
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async getAllProfileSharenotes(@CurrentUser() user: UserSchema): Promise<any> {
    let res;
    try {
      res = this.queryBus.execute<SharenoteProfileQuery, ProfileSharenoteDto[]>(new SharenoteProfileQuery(user.userId));
    } catch (e) {
      return new HttpException('Profile NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return res;
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
      const listObjFile = await this.fileService.uploadsParams(files, user.userId, sharenoteCollectionName);
      //let ans = await this.fileService.upload(files[i]);
      // const res: Sharenote;
      const res = await this.commandBus.execute<CreateSharenoteCommand, Sharenote>(
        new CreateSharenoteCommand(user.userId, createSharenoteRequest, listObjFile),
      );
      return res;
    } catch (e) {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Put('like/:id')
  @UseGuards(AuthGuard())
  async likeSharenote(@CurrentUser() user: UserSchema, @Param('id') id: string): Promise<any> {
    let res;
    const idType: LikeSharenoteDto = {
      sharenoteId: id,
    };
    try {
      res = this.commandBus.execute<LikeSharenoteCommand, any>(new LikeSharenoteCommand(user.userId, idType));
    } catch (e) {
      return new HttpException('Controller ERROR ', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Put('view/:id')
  @UseGuards(AuthGuard())
  async viewSharenote(@CurrentUser() user: UserSchema, @Param('id') id: string): Promise<any> {
    let res;
    const idType: LikeSharenoteDto = {
      sharenoteId: id,
    };
    try {
      res = this.commandBus.execute<ViewSharenoteCommand, any>(new ViewSharenoteCommand(user.userId, idType));
    } catch (e) {
      return new HttpException('Controller ERROR ', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
