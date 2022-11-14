import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { BlogreviewEntityRepository } from '../../db/blogreview-entity.repository';
import { RemoveLikedReviewRequest } from '../../dtos/remove-liked-blogreview.dto';

export class RemoveLikedReviewCommand {
  constructor(public readonly userId: string, public readonly removeLikedReviewRequest: RemoveLikedReviewRequest) {}
}

@CommandHandler(RemoveLikedReviewCommand)
export class RemoveLikedReviewCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly blogreviewEntityRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ userId, removeLikedReviewRequest }: RemoveLikedReviewCommand): Promise<any> {
    const newUser = await this.userEntityRepository.findOneById(userId);
    const { reviewId } = removeLikedReviewRequest;

    await this.blogreviewEntityRepository.findById(reviewId);
    newUser.removeLikeBlogreview(removeLikedReviewRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
    return;
  }
}
