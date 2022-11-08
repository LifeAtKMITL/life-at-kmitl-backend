import { CreateDormReviewDto } from './../../dtos/command/create-dormReview';

export class CreateDormReviewCommand {
  constructor(public readonly userId: string, public readonly createDormReviewDto: CreateDormReviewDto) {}
}
