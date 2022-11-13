import { IsNotEmpty } from 'class-validator';

export class RemoveBookmarkedReviewRequest {
  @IsNotEmpty()
  reviewId: string;
}
