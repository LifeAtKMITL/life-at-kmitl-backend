import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubjectFactory } from '../../subject.factory';
import { CreateSubjectCommand } from './create-subject.command';

@CommandHandler(CreateSubjectCommand)
export class CreateSubjectCommandHandler implements ICommandHandler {
  constructor(private readonly subjectFactory: SubjectFactory) {}

  async execute({ createSubjectRequest }: CreateSubjectCommand): Promise<void> {
    const { name, sec, credit, teachers } = createSubjectRequest;
    const subject = this.subjectFactory.create({ name, sec, credit, teachers });
  }
}
