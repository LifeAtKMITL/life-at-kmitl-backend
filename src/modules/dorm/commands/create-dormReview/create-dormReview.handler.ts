import { DormReviewFactory } from './../../dormReview.factory';
import { DormReview } from './../../DormReview';
import { CreateDormReviewDto } from './../../dtos/command/create-dormReview';
import { CreateDormReviewCommand } from './create-dormReview.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DormFactory } from '../../dorm.factory';

@CommandHandler(CreateDormReviewCommand)
export class CreateDormReviewCommandHandler implements ICommandHandler {
  constructor(private readonly dormReviewFactory: DormReviewFactory) {}

  async execute(createDormReviewCommand: CreateDormReviewCommand): Promise<void> {
    const { userId, createDormReviewDto } = createDormReviewCommand;

    //console.log(createDormReviewDto.dormId);

    const dormReview = this.dormReviewFactory.create(userId, createDormReviewDto);
  }
}
