import { BlogreviewEntityRepository } from '../../db/blogreview-entity.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeBlogreviewCommand } from './like-blogreview.command';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';

@CommandHandler(LikeBlogreviewCommand)
export class LikeBlogreviewCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly blogreviewEntityRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ userId, likeBlogreviewDto }: LikeBlogreviewCommand): Promise<void> {
    const newUser = await this.userEntityRepository.findOneById(userId);

    const isNewUser = newUser.setLikedReviews(likeBlogreviewDto);

    const blogreview = await this.blogreviewEntityRepository.findById(likeBlogreviewDto.reviewId);
    if (isNewUser) {
      blogreview.addLikeCount();
    } else {
      blogreview.minusLikeCount();
    }
    await this.blogreviewEntityRepository.findOneAndReplaceById(blogreview.getId(), blogreview);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
    return;
  }
}
