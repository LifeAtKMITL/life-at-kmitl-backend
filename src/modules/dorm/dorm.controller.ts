import { AddScoreDormCommand } from './commands/add-score-dorm/add-dorm.command';
import { AddFavoriteSubjectCommand } from '../user/commands/add-favorite-gened/add-favorite-subject.handler';
import { AddScoreDto } from './dtos/command/add-score-dorm.dto';
import { UserSchema } from './../user/db/user-schema';
import { CurrentUser } from './../auth/decorators/current-user.decorator';
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
import { CreateDormReviewCommand } from './commands/create-dormReview/create-dormReview.command';
import { CreateDormReviewDto } from './dtos/command/create-dormReview';

@Controller('dorm')
export class DormController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  async getAllDorms(): Promise<any> {
    return await this.queryBus.execute<DormsQuery, any>(new DormsQuery());
  }

  @Post('filter')
  // TODO: Please fix <any> to some type (interface or class will do!)
  async getDormByFilterOptions(@Body() filterOptionsDto: FilterOptionsDto): Promise<any> {
    return await this.queryBus.execute<DormsByFilterOptionsQuery, any>(new DormsByFilterOptionsQuery(filterOptionsDto));
  }

  @Get(':id')
  async getDormById(@Param('id') id: string): Promise<any> {
    return this.queryBus.execute<DormByIdQuery, any>(new DormByIdQuery(id));
  }

  @Post('create')
  async createDorm(@Body() createDormRequest: CreateDormRequest): Promise<void> {
    await this.commandBus.execute<CreateDormCommand, void>(new CreateDormCommand(createDormRequest));
  }

  @Put('score')
  @UseGuards(AuthGuard())
  async addScoreDorm(@CurrentUser() user: UserSchema, @Body() addScoreDto: AddScoreDto): Promise<void> {
    this.commandBus.execute<AddScoreDormCommand, void>(new AddScoreDormCommand(user.userId, addScoreDto));
  }
}
