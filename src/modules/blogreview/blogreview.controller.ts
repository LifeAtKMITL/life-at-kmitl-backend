import { Blogreview } from './Blogreview';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/create-blogreview/create-blogreview.command';
import { CreateBlogreviewRequest } from './dtos/request/create-blog-request.dto';
import { BlogreviewByIdQuery } from './queries/blogreview-by-id.query-handler';
import { BlogreviewsDto } from '../blogreview/dtos/blogreviews.dto';
import { BlogreviewDto } from './dtos/blogreview.dto';
import { BlogreviewsQuery } from './queries/blogreview.query-handler';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserSchema } from '../user/db/user-schema';

@Controller('blogreview')
export class BlogreviewController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @UseGuards(AuthGuard())
  async createBlogreview(
    @CurrentUser() user: UserSchema,
    @Body() CreateBlogreviewRequest: CreateBlogreviewRequest,
  ): Promise<any> {
    const blogreview = await this.commandBus.execute<CreateBlogCommand, Blogreview>(
      new CreateBlogCommand(user.userId, CreateBlogreviewRequest),
    );
    if (blogreview === undefined) {
      throw new HttpException('NOT FOUND in both SubjectId and GenEdId', HttpStatus.NOT_FOUND);
    }

    return new HttpException('Blogreview Created', HttpStatus.CREATED);
  }

  @Get()
  async getAllBlogreviews(): Promise<BlogreviewsDto[]> {
    return await this.queryBus.execute<BlogreviewsQuery, BlogreviewsDto[]>(new BlogreviewsQuery());
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async getBlogreviewById(@CurrentUser() user: UserSchema): Promise<any> {
    return this.queryBus.execute<BlogreviewByIdQuery, any>(new BlogreviewByIdQuery(user.userId));
  }
}
