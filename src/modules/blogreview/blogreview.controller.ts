import { Body, Controller, Post, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/create-blogreview/create-blogreview.command';
import { CreateBlogreviewRequest } from './dtos/request/create-blog-request.dto';
import { BlogreviewsDto } from '../blogreview/dtos/blogreviews.dto';
import { BlogreviewsQuery } from './queries/blogreview.query-handler';

@Controller('blogreview')
export class BlogreviewController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async createBlogreview(@Body() CreateBlogreviewRequest: CreateBlogreviewRequest): Promise<void> {
    await this.commandBus.execute<CreateBlogCommand, void>(new CreateBlogCommand(CreateBlogreviewRequest));
  }

  @Get()
  async getAllBlogreviews(): Promise<BlogreviewsDto[]> {
    return await this.queryBus.execute<BlogreviewsQuery, BlogreviewsDto[]>(new BlogreviewsQuery());
  }
}
