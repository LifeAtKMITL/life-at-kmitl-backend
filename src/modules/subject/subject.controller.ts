import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSubjectCommand } from './commands/create-subject/create-subject.command';
import { CreateSubjectRequest } from './dtos/request/create-subject-request.dto';
import { SubjectsDto } from './dtos/request/subjects.dto';
import { SubjectsQuery } from './queries/subjects.query-handler';

@Controller('subject')
export class SubjectController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  async getAllSubjects(): Promise<SubjectsDto[]> {
    return await this.queryBus.execute<SubjectsQuery, SubjectsDto[]>(new SubjectsQuery());
  }

  @Post()
  async createSubject(@Body() createSubjectRequest: CreateSubjectRequest): Promise<void> {
    await this.commandBus.execute<CreateSubjectCommand, void>(new CreateSubjectCommand(createSubjectRequest));
  }

  //TODO: get subject by id -> combined each sec into one object (array date-time, teachers, sec) same size
}
