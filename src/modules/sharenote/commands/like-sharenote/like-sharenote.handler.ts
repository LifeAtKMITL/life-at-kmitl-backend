import { SharenoteEntityRepository } from './../../db/sharenote-entity.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeSharenoteCommand } from './like-sharenote.command';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';

@CommandHandler(LikeSharenoteCommand)
export class LikeSharenoteCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly sharenoteEntityRepository: SharenoteEntityRepository,
  ) {}

  async execute({ userId, likeSharenoteDto }: LikeSharenoteCommand): Promise<any> {
    const newUser = await this.userEntityRepository.findOneById(userId);

    const isNewUser = newUser.setLikedNotes(likeSharenoteDto);

    const sharenote = await this.sharenoteEntityRepository.findOneById(likeSharenoteDto.sharenoteId);
    if (isNewUser) {
      sharenote.addLikeCount();
    } else {
      sharenote.minusLikeCount();
    }
    await this.sharenoteEntityRepository.findOneAndReplaceById(sharenote.getId(), sharenote);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
    return;
  }
}
