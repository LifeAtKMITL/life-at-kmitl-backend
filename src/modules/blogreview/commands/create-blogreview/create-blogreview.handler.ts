import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlogreviewFactory } from '../../blogreview.factory';
import { CreateBlogCommand } from './create-blogreview.command';

@CommandHandler(CreateBlogCommand)
export class CreateBlogreviewCommandHandler implements ICommandHandler {
  constructor(private readonly blogreviewFactory: BlogreviewFactory) {}

  async execute({ createBlogreviewRequest }: CreateBlogCommand): Promise<void> {
    const { subjectId, textSubjectReview, userId, userName, userId_Liked, rate, date} = createBlogreviewRequest;
    const blogreview = this.blogreviewFactory.create({ subjectId, textSubjectReview, userId, userName, userId_Liked, rate, date });
  }
}
