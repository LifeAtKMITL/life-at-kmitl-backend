import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserSchema } from '../user/db/user-schema';
import { CreateSubjectCommand } from './commands/create-subject/create-subject.command';
import { CreateSubjectRequest } from './dtos/request/create-subject-request.dto';
import { AddFavoriteSubjectRequest } from './dtos/request/add-favorite-subject.dto';
import { SubjectDto } from './dtos/subject.dto';
import { SubjectsDto } from './dtos/subjects.dto';
import { SubjectByIdQuery } from './queries/subject-by-id.query-handler';
import { SubjectsQuery } from './queries/subjects.query-handler';
import { AddFavoriteSubjectCommand } from './commands/add-favorite-gened/add-favorite-subject.handler';
import { FilterSubjectRequest } from './dtos/request/filter-subject-request.dto';
import { FilterSubjectQuery } from './queries/filter-subect.query-handler';

@Controller('subject')
export class SubjectController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  /*
   * DESC: API to get all subjects
   * ROUTE: subject/
   * METHOD: GET
   * RES: SubjectsDto[]
   */
  @Get()
  async getAllSubjects(): Promise<SubjectsDto[]> {
    return await this.queryBus.execute<SubjectsQuery, SubjectsDto[]>(new SubjectsQuery());
  }

  /*
   * DESC: API to create subject <- will probably not use (delete later)
   * ROUTE: subject/
   * METHOD: POST
   * RES: void
   */
  @Post()
  async createSubject(@Body() createSubjectRequest: CreateSubjectRequest): Promise<void> {
    await this.commandBus.execute<CreateSubjectCommand, void>(new CreateSubjectCommand(createSubjectRequest));
  }

  /*
   * DESC: API to get subject by subjectId
   * ROUTE: subject/:id
   * METHOD: GET
   * RES: SubjectDto
   */
  @Get(':id')
  async getSubjectById(@Param('id') id: string): Promise<SubjectDto[]> {
    return this.queryBus.execute<SubjectByIdQuery, SubjectDto[]>(new SubjectByIdQuery(id));
  }

  /*
   * DESC: API to add subject to user
   * ROUTE: subject/favorite
   * METHOD: PUT + with jwt-auth
   * RES: void
   */
  @Put('favorite')
  @UseGuards(AuthGuard())
  async saveFavoriteSubject(
    @CurrentUser() user: UserSchema,
    @Body() saveFavoriteSubjectRequest: AddFavoriteSubjectRequest,
  ): Promise<void> {
    this.commandBus.execute<AddFavoriteSubjectCommand, void>(
      new AddFavoriteSubjectCommand(user.userId, saveFavoriteSubjectRequest),
    );
  }

  /*
   * DESC: API to filter out available gened from given subject
   * ROUTE: subject/filter
   * METHOD: Post
   * RES: SubjectDto[] (for the gened class that is available)
   */
  @Post('filter')
  async filterSubject(@Body() filterSubjectRequest: FilterSubjectRequest[]): Promise<SubjectDto[]> {
    return this.queryBus.execute<FilterSubjectQuery, SubjectDto[]>(new FilterSubjectQuery(filterSubjectRequest));
  }
}
