import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateSharenoteCommand } from './commands/create-sharenote/create-sharenote.command';
import { CreateSharenoteRequest } from './dtos/request/create-sharenote-request.dto';

@Controller('sharenote')
export class SharenoteController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createSharenote(@Body() createSharenoteRequest: CreateSharenoteRequest): Promise<void> {
    await this.commandBus.execute<CreateSharenoteCommand, void>(new CreateSharenoteCommand(createSharenoteRequest));
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>): Promise<void> {
    console.log(files);
  }
}
