import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { CreateSubjectCommand } from './commands/create-subject/create-subject.command';
import { CreateSubjectRequest } from './dtos/request/create-subject-request.dto';
import { SaveFavoriteSubjectRequest } from './dtos/request/save-favorite-subject.dto';
import { SubjectDto } from './dtos/subject.dto';
import { SubjectsDto } from './dtos/subjects.dto';
import { SubjectByIdQuery } from './queries/subject-by-id.query-handler';
import { SubjectsQuery } from './queries/subjects.query-handler';

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
  async getSubjectById(@Param('id') id: string): Promise<SubjectsDto> {
    return this.queryBus.execute<SubjectByIdQuery, SubjectDto>(new SubjectByIdQuery(id));
  }

  @Put('favorite')
  @UseGuards(AuthGuard())
  async saveFavoriteSubject(
    @CurrentUser() user: User,
    @Body() saveFavoriteSubjectRequest: SaveFavoriteSubjectRequest[],
  ): Promise<void> {
    console.log(saveFavoriteSubjectRequest);
  }
}
