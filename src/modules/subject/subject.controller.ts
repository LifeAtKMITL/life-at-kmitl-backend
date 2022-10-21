import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSubjectCommand } from './commands/create-subject/create-subject.command';
import { CreateSubjectRequest } from './dtos/request/create-subject-request.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createSubject(@Body() createSubjectRequest: CreateSubjectRequest): Promise<void> {
    await this.commandBus.execute<CreateSubjectCommand, void>(new CreateSubjectCommand(createSubjectRequest));
  }
}
