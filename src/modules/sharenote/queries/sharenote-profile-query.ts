import { SharenoteEntityRepository } from './../db/sharenote-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { ProfileSharenoteDto } from '../dtos/profileSharenote/profile-sharenote.dto';

export class SharenoteProfileQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(SharenoteProfileQuery)
export class SharenoteProfileQueryHandler implements IQueryHandler {
  constructor(
    private readonly sharenoteRepository: SharenoteEntityRepository,
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute({ userId }: SharenoteProfileQuery): Promise<ProfileSharenoteDto> {
    const sharenotes = await this.sharenoteRepository.findById(userId);
    if (sharenotes.length == 0 || sharenotes == undefined) {
      return;
    }
    let totalViewCount = 0;
    let likeCount = 0;

    sharenotes.forEach((sharenote) => {
      totalViewCount += sharenote.getViewCount();
      likeCount += sharenote.getLikeCount();
    });
    const user = await this.userRepository.findOneById(userId);
    const res = {
      _id: user.getId(),
      userId: user.getUserId(),
      username: user.getUsername(),
      image: user.getImage(),
      likedNotes: user.getLikedNotes(),
      sharenotes: sharenotes,
      collectionCount: sharenotes.length,
      totalViewCount: totalViewCount,
      likeCount: likeCount,
    };
    return res;
  }
}
