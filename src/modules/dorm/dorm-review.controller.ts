import { CreateDormReviewCommand } from './commands/create-dormReview/create-dormReview.command';
import { CreateDormReviewDto } from './dtos/command/create-dormReview';
import { AddScoreDormCommand } from './commands/add-score-dorm/add-dorm.command';
import { AddFavoriteSubjectCommand } from '../user/commands/add-favorite-gened/add-favorite-subject.handler';
import { AddScoreDto } from './dtos/command/add-score-dorm.dto';
import { UserSchema } from '../user/db/user-schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { DormsByFilterOptionsQuery } from './queries/dorms-by-filterOptions.query-handler ';
import { FilterOptionsDto } from './dtos/request/filterOptions-query';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDormCommand } from './commands/create-dorm/create-dorm.command';
import { CreateDormRequest } from './dtos/request/create-dorm-request.dto';
import { DormsQuery } from './queries/dorms.query-handler';
import { DormByIdQuery } from './queries/dorm-by-id.query-handler';
import { DormsDto } from './dtos/request/dorms.dto';
import { DormReviewByIdQuery } from './queries/dormReviews/dormReview-by-id.query-handler';

@Controller('dorm/review')
export class DormReviewController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createDormReview(
    @CurrentUser() user: UserSchema,
    @Body() createDormReviewDto: CreateDormReviewDto,
  ): Promise<any> {
    this.commandBus.execute<CreateDormReviewCommand, void>(
      new CreateDormReviewCommand(user.userId, createDormReviewDto),
    );
  }

  @Get(':id')
  async getAllDormReviewsById(@Param('id') id: string): Promise<any[]> {
    return this.queryBus.execute<DormReviewByIdQuery, any>(new DormReviewByIdQuery(id));
  }
}
