import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { Blogreview } from './../Blogreview';
import { BlogreviewEntityRepository } from './../db/blogreview-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';

export class GetBookmarkedReviewQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetBookmarkedReviewQuery)
export class GetBookmarkedReviewQueryHandler implements IQueryHandler {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly blogreviewRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ userId }: GetBookmarkedReviewQuery): Promise<any> {
    const user = await this.userRepository.findOneById(userId);
    const bookmarks = user.getBookmarkedReviews();
    const temp = [];

    bookmarks.forEach(async (reviewId) => {
      temp.push(reviewId.reviewId);
    });

    const bookmarkedreviews = await this.blogreviewRepository.findByIds(temp);

    return bookmarkedreviews.map((blogreview) => {
      const temp = {
        _id: blogreview.getId(),
        subjectId: blogreview.getSubjectId(),
        subjectName: blogreview.getSubjectName(),
        textSubjectReview: blogreview.getTextSubjectReview(),
        userId: blogreview.getUserId(),
        likeCount: blogreview.getLikeCount(),
        date: blogreview.getDate(),
        username: user.getUsername(),
        imagePath: user.getImage(),
      };
      return temp;
    });
  }
}
