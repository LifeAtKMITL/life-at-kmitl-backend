import { Blogreview } from './../../Blogreview';
import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlogreviewFactory } from '../../blogreview.factory';
import { CreateBlogCommand } from './create-blogreview.command';

@CommandHandler(CreateBlogCommand)
export class CreateBlogreviewCommandHandler implements ICommandHandler {
  constructor(private readonly blogreviewFactory: BlogreviewFactory) {}

  async execute({ userId, createBlogreviewRequest }: CreateBlogCommand): Promise<Blogreview> {
    const blogreview = await this.blogreviewFactory.create(
      userId,
      createBlogreviewRequest.subjectId,
      createBlogreviewRequest.textSubjectReview,
    );

    return blogreview;
  }
}
