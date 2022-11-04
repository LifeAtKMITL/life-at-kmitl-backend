import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubjectFactory } from '../../subject.factory';
import { CreateSubjectCommand } from './create-subject.command';

@CommandHandler(CreateSubjectCommand)
export class CreateSubjectCommandHandler implements ICommandHandler {
  constructor(private readonly subjectFactory: SubjectFactory) {}

  async execute({ createSubjectRequest }: CreateSubjectCommand): Promise<void> {
    const { subjectId, name, classDateTime, midtermDateTime, finalDateTime, sec, credit, teachers } =
      createSubjectRequest;
    const subject = this.subjectFactory.create({
      subjectId,
      name,
      classDateTime,
      midtermDateTime,
      finalDateTime,
      sec,
      credit,
      teachers,
    });
  }
}
