import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/create-blogreview/create-blogreview.command';
import { CreateBlogreviewRequest } from './dtos/request/create-blog-request.dto';
import { BlogreviewByUserQuery } from './queries/blogreview-by-id.query-handler';
import { BlogreviewsDto } from '../blogreview/dtos/blogreviews.dto';
import { BlogreviewDto } from './dtos/blogreview.dto';
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

  @Get(':id')
  async getBlogreviewById(@Param('userID') id: string): Promise<BlogreviewsDto> {
    return this.queryBus.execute<BlogreviewByUserQuery, BlogreviewDto>(new BlogreviewByUserQuery(id));
  }
}
