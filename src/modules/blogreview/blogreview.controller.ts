import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/create-blogreview/create-blogreview.command';
import { CreateBlogreviewRequest } from './dtos/request/create-blog-request.dto';

@Controller('blogreview')
export class BlogreviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createBlogreview(@Body() CreateBlogreviewRequest: CreateBlogreviewRequest): Promise<void> {
    await this.commandBus.execute<CreateBlogCommand, void>(new CreateBlogCommand(CreateBlogreviewRequest));
  }
}
