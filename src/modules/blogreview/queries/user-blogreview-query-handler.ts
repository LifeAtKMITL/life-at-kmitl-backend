import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { Blogreview } from './../Blogreview';
import { BlogreviewEntityRepository } from './../db/blogreview-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewDto } from '../dtos/blogreview.dto';

export class UserBlogreviewQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(UserBlogreviewQuery)
export class UserBlogreviewQueryHandler implements IQueryHandler {
  constructor(
    private readonly userRepository: UserEntityRepository,

    private readonly blogreviewRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ userId }: UserBlogreviewQuery): Promise<any> {
    const user = await this.userRepository.findOneById(userId);

    return {
      bookmarkedReviews: user.getBookmarkedReviews(),
      likedReviews: user.getLikedReviews(),
      image: user.getImage(),
      username: user.getUsername(),
      userId: user.getUserId(),
    };
  }
}
