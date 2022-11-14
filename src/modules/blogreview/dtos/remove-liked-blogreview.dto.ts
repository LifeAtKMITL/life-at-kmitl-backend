import { IsNotEmpty } from 'class-validator';

export class RemoveLikedReviewRequest {
  @IsNotEmpty()
  reviewId: string;
}
