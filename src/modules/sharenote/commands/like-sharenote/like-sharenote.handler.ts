import { Sharenote } from './../../Sharenote';
import { SharenoteEntityRepository } from './../../db/sharenote-entity.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeSharenoteCommand } from './like-sharenote.command';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/modules/user/User';

@CommandHandler(LikeSharenoteCommand)
export class LikeSharenoteCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly sharenoteEntityRepository: SharenoteEntityRepository,
  ) {}

  async execute({ userId, likeSharenoteDto }: LikeSharenoteCommand): Promise<any> {
    let newUser: User;
    try {
      newUser = await this.userEntityRepository.findOneById(userId);
    } catch (e) {
      return new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }

    const isNewUser = newUser.setLikedNotes(likeSharenoteDto);
    let sharenote: Sharenote;
    try {
      sharenote = await this.sharenoteEntityRepository.findOneById(likeSharenoteDto.sharenoteId);
    } catch (e) {
      return new HttpException('NOT FOUND Sharenote', HttpStatus.NOT_FOUND);
    }
    if (isNewUser) {
      sharenote.addLikeCount();
    } else {
      sharenote.minusLikeCount();
    }
    await this.sharenoteEntityRepository.findOneAndReplaceById(sharenote.getId(), sharenote);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
    return sharenote;
  }
}
