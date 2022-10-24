import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/create-subject/create-blogreview.command';
import { CreateBlogreviewRequest } from './dtos/request/create-blog-request.dto';

@Controller('subject')
export class BlogreviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createBlogreview(@Body() CreateBlogreviewRequest: CreateBlogreviewRequest): Promise<void> {
    await this.commandBus.execute<CreateBlogCommand, void>(new CreateBlogCommand(CreateBlogreviewRequest));
  }
}
