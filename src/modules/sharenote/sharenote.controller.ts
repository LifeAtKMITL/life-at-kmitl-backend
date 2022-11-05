import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSharenoteCommand } from './commands/create-sharenote/create-sharenote.command';
import { CreateSharenoteRequest } from './dtos/request/create-sharenote-request.dto';

@Controller('sharenote')
export class SharenoteController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createSharenote(@Body() createSharenoteRequest: CreateSharenoteRequest): Promise<void> {
    await this.commandBus.execute<CreateSharenoteCommand, void>(new CreateSharenoteCommand(createSharenoteRequest));
  }
}
