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
  Put,
  Delete,
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
import { User } from '../user/User';
import { AddBookmarkBlogreviewRequest } from './dtos/request/add-bookmark-blogreview.dto';
import { AddBookmarkBlogreviewCommand } from './commands/add-bookmark-blogreview/add-bookmark-blogreview.handler';
import { LikeBlogreviewDto } from './dtos/request/like-blogreview.dto';
import { LikeBlogreviewCommand } from './commands/like-blogreview/like-blogreview.command';
import { GetBookmarkedReviewQuery } from './queries/bookmarked-blogreview-query-handler';
import { UserBlogreviewQuery } from './queries/user-blogreview-query-handler';
import { RemoveBookmarkedReviewRequest } from './dtos/remove-bookmarked-blogreview.dto';
import { RemoveBookmarkedReviewCommand } from './commands/remove-bookmark-blogreview/remove-bookmark-blogreview.handler';
import { RemoveLikedReviewRequest } from './dtos/remove-liked-blogreview.dto';
import { RemoveLikedReviewCommand } from './commands/remove-like-review/remove-like-blogreview.handler';

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
      return new HttpException('NOT FOUND in both SubjectId and GenEdId', HttpStatus.NOT_FOUND);
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

  @Put('bookmark')
  @UseGuards(AuthGuard())
  async saveBookmarkBlogreview(
    @CurrentUser() user: UserSchema,
    @Body() saveBookmarkBlogreview: AddBookmarkBlogreviewRequest,
  ): Promise<void> {
    this.commandBus.execute<AddBookmarkBlogreviewCommand, void>(
      new AddBookmarkBlogreviewCommand(user.userId, saveBookmarkBlogreview),
    );
  }

  // like and unlike at the same time
  @Put('like')
  @UseGuards(AuthGuard())
  async likeBlogreview(@CurrentUser() user: UserSchema, @Body() likeBlogreviewDto: LikeBlogreviewDto): Promise<void> {
    this.commandBus.execute<LikeBlogreviewCommand, void>(new LikeBlogreviewCommand(user.userId, likeBlogreviewDto));
  }

  @Get('bookmarkedreview')
  @UseGuards(AuthGuard())
  async getBookmarkedReviews(@CurrentUser() user: UserSchema): Promise<void> {
    return this.queryBus.execute<GetBookmarkedReviewQuery, any>(new GetBookmarkedReviewQuery(user.userId));
  }

  @Get('userreviews')
  @UseGuards(AuthGuard())
  async getUserReviews(@CurrentUser() user: UserSchema): Promise<void> {
    return this.queryBus.execute<UserBlogreviewQuery, any>(new UserBlogreviewQuery(user.userId));
  }

  @Delete('bookmark')
  @UseGuards(AuthGuard())
  async removeBookmarkedReview(
    @CurrentUser() user: UserSchema,
    @Body() removeBookmarkedReviewRequest: RemoveBookmarkedReviewRequest,
  ): Promise<void> {
    return this.commandBus.execute<RemoveBookmarkedReviewCommand, void>(
      new RemoveBookmarkedReviewCommand(user.userId, removeBookmarkedReviewRequest),
    );
  }

  // unusable -> dont know why
  @Delete('like')
  @UseGuards(AuthGuard())
  async removeLikedReview(
    @CurrentUser() user: UserSchema,
    @Body() removeLikedReviewRequest: RemoveLikedReviewRequest,
  ): Promise<void> {
    return this.commandBus.execute<RemoveLikedReviewCommand, void>(
      new RemoveLikedReviewCommand(user.userId, removeLikedReviewRequest),
    );
  }
}
