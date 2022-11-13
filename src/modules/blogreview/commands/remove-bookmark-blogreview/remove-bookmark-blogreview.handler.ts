import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { BlogreviewEntityRepository } from '../../db/blogreview-entity.repository';
import { RemoveBookmarkedReviewRequest } from '../../dtos/remove-bookmarked-blogreview.dto';

export class RemoveBookmarkedReviewCommand {
  constructor(
    public readonly userId: string,
    public readonly removeBookmarkedReviewRequest: RemoveBookmarkedReviewRequest,
  ) {}
}

@CommandHandler(RemoveBookmarkedReviewCommand)
export class RemoveBookmarkedReviewCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly blogreviewEntityRepository: BlogreviewEntityRepository
  ) {}

  async execute({ userId, removeBookmarkedReviewRequest }: RemoveBookmarkedReviewCommand): Promise<any> {
    const newUser = await this.userEntityRepository.findOneById(userId);
    const { reviewId } = removeBookmarkedReviewRequest;
    // check if the subject are exist
    await this.blogreviewEntityRepository.findById(reviewId)
    newUser.removeBookmarkBlogreview(removeBookmarkedReviewRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
    return;
  }
}
